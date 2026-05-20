
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function leerInput(mensaje) {
  return new Promise(resolve => {
    rl.question(mensaje, resolve);
  });
}

async function pausar() {
  await new Promise(resolve => rl.question("\nPresiona Enter para continuar...", resolve));
}

// Seleccionar base de datos
db = db.getSiblingDB('tienda');
print("✅ Conectado a: " + db.getName());

// ==============================================
// FUNCIONES CREATE (Insertar)
// ==============================================

/**
 * Inserta un producto individual en la colección
 * @returns {Object} Resultado con insertedId
 */
async function doInsertarUnProducto() {
  print("\n" + "=".repeat(50));
  print("📝 OPERACIÓN: Insertar 1 producto");
  print("=".repeat(50));

  let nombre = await leerInput("Nombre: ");
  let precio = parseFloat(await leerInput("Precio: "));
  let stock = parseInt(await leerInput("Stock: "));
  let categoria = await leerInput("Categoría: ");

  let resultado = db.productos.insertOne({
    nombre: nombre,
    precio: precio,
    stock: stock,
    categoria: categoria,
    valoracion: 0,
    etiquetas: [],
    activo: true,
    fechaCreacion: new Date()
  });

  print("\n📊 RESULTADO:");
  print(`   ✅ Documentos insertados: 1`);
  print(`   🆔 ID del documento: ${resultado.insertedId}`);
  print(`   📦 Producto: ${nombre} (${precio}€)`);

  return resultado;
}

/**
 * Inserta 3 productos de la categoría 'ofertas'
 * @returns {Object} Resultado con insertedCount e insertedIds
 */
async function doInsertarTresProductosOfertas() {
  print("\n" + "=".repeat(50));
  print("📝 OPERACIÓN: Insertar 3 productos de ofertas");
  print("=".repeat(50));

  let ofertas = [
    {
      nombre: "Smart TV 55\" 4K",
      precio: 399.99,
      stock: 15,
      categoria: "ofertas",
      valoracion: 4.5,
      etiquetas: ["smart", "4k", "oferta"],
      activo: true
    },
    {
      nombre: "Auriculares Bluetooth",
      precio: 29.99,
      stock: 50,
      categoria: "ofertas",
      valoracion: 4.2,
      etiquetas: ["inalámbrico", "oferta"],
      activo: true
    },
    {
      nombre: "Tablet 10\"",
      precio: 149.99,
      stock: 8,
      categoria: "ofertas",
      valoracion: 4.0,
      etiquetas: ["tablet", "oferta"],
      activo: true
    }
  ];

  let resultado = db.productos.insertMany(ofertas);

  print("\n📊 RESULTADO:");
  print(`   ✅ Documentos insertados: ${resultado.insertedCount}`);
  print(`   🆔 IDs generados:`);
  for (let i = 0; i < resultado.insertedCount; i++) {
    let id = Object.values(resultado.insertedIds)[i];
    print(`      ${i + 1}. ${id}`);
  }
  print(`   📦 Productos añadidos: Smart TV, Auriculares, Tablet`);

  return resultado;
}

// ==============================================
// FUNCIONES READ (Leer)
// ==============================================

/**
 * Lista todos los productos de la colección
 * @returns {number} Cantidad de productos encontrados
 */
async function doListarTodosProductos() {
  print("\n" + "=".repeat(50));
  print("📖 OPERACIÓN: Listar todos los productos");
  print("=".repeat(50));

  let productos = db.productos.find();
  let count = 0;

  if (productos.hasNext()) {
    print("\n📋 LISTA DE PRODUCTOS:");
    print("-".repeat(50));
    productos.forEach(doc => {
      count++;
      print(`\n${count}. ${doc.nombre}`);
      print(`   Precio: ${doc.precio}€`);
      print(`   Stock: ${doc.stock}`);
      print(`   Categoría: ${doc.categoria}`);
      if (doc.valoracion) print(`   Valoración: ${doc.valoracion}⭐`);
      if (doc.etiquetas && doc.etiquetas.length) print(`   Etiquetas: ${doc.etiquetas.join(", ")}`);
      print(`   Activo: ${doc.activo ? "✅" : "❌"}`);
    });
  } else {
    print("\n❌ No hay productos en la colección");
  }

  print("\n📊 RESULTADO:");
  print(`   📦 Total de productos encontrados: ${count}`);

  return count;
}

/**
 * Busca productos con precio inferior a 50€
 * @returns {number} Cantidad de productos encontrados
 */
async function doBuscarPrecioMenor50() {
  print("\n" + "=".repeat(50));
  print("📖 OPERACIÓN: Buscar productos con precio < 50€");
  print("=".repeat(50));

  let baratos = db.productos.find({ precio: { $lt: 50 } });
  let count = 0;

  if (baratos.hasNext()) {
    print("\n🛒 PRODUCTOS ECONÓMICOS:");
    print("-".repeat(50));
    baratos.forEach(doc => {
      count++;
      print(`\n${count}. ${doc.nombre}`);
      print(`   💰 Precio: ${doc.precio}€`);
      print(`   📦 Stock: ${doc.stock}`);
      print(`   🏷️ Categoría: ${doc.categoria}`);
    });
  } else {
    print("\n❌ No se encontraron productos con precio menor a 50€");
  }

  print("\n📊 RESULTADO:");
  print(`   🔍 Productos encontrados: ${count}`);
  print(`   💰 Condición: precio < 50€`);

  return count;
}

/**
 * Busca productos de una categoría específica con stock > 0
 * @param {string} categoria - Categoría a buscar (default: 'ofertas')
 * @returns {Object} Resultados con count y productos
 */
async function doBuscarCategoriaConStock(categoria = "ofertas") {
  print("\n" + "=".repeat(50));
  print(`📖 OPERACIÓN: Buscar productos de "${categoria}" con stock disponible`);
  print("=".repeat(50));

  let disponibles = db.productos.find({
    categoria: categoria,
    stock: { $gt: 0 }
  });

  let count = 0;
  let stockTotal = 0;

  if (disponibles.hasNext()) {
    print(`\n🛍️ PRODUCTOS DE "${categoria.toUpperCase()}" DISPONIBLES:`);
    print("-".repeat(50));
    disponibles.forEach(doc => {
      count++;
      stockTotal += doc.stock;
      print(`\n${count}. ${doc.nombre}`);
      print(`   💰 Precio: ${doc.precio}€`);
      print(`   📦 Stock disponible: ${doc.stock} unidades`);
      if (doc.valoracion) print(`   ⭐ Valoración: ${doc.valoracion}`);
    });
  } else {
    print(`\n❌ No hay productos de "${categoria}" con stock disponible`);
  }

  print("\n📊 RESULTADO:");
  print(`   🔍 Productos encontrados: ${count}`);
  print(`   📦 Stock total disponible: ${stockTotal} unidades`);
  print(`   🏷️ Categoría: ${categoria}`);

  return { count, stockTotal };
}

/**
 * Busca productos con valoración >= 4.0 (solo muestra nombre, precio, valoración)
 * @returns {number} Cantidad de productos encontrados
 */
async function doBuscarValoracionAlta() {
  print("\n" + "=".repeat(50));
  print("📖 OPERACIÓN: Buscar productos con valoración ≥ 4.0 ⭐");
  print("=".repeat(50));

  let valorados = db.productos.find(
    { valoracion: { $gte: 4.0 } },
    { nombre: 1, precio: 1, valoracion: 1, _id: 0 }
  );

  let count = 0;
  let sumaValoraciones = 0;

  if (valorados.hasNext()) {
    print("\n🏆 PRODUCTOS MEJOR VALORADOS (≥4.0 ⭐):");
    print("-".repeat(50));
    valorados.forEach(doc => {
      count++;
      sumaValoraciones += doc.valoracion;
      print(`\n${count}. ${doc.nombre}`);
      print(`   💰 Precio: ${doc.precio}€`);
      print(`   ⭐ Valoración: ${doc.valoracion}/5.0`);
    });
    let promedio = (sumaValoraciones / count).toFixed(2);
    print(`\n📈 PROMEDIO DE VALORACIONES: ${promedio}⭐`);
  } else {
    print("\n❌ No hay productos con valoración ≥ 4.0");
  }

  print("\n📊 RESULTADO:");
  print(`   🔍 Productos encontrados: ${count}`);
  print(`   ⭐ Condición: valoración ≥ 4.0`);

  return count;
}

/**
 * Busca productos por etiqueta
 * @returns {number} Cantidad de productos encontrados
 */
async function doBuscarPorEtiqueta() {
  let etiqueta = await leerInput("Etiqueta a buscar: ");

  print("\n" + "=".repeat(50));
  print(`📖 OPERACIÓN: Buscar productos con etiqueta "${etiqueta}"`);
  print("=".repeat(50));

  let productos = db.productos.find({ etiquetas: etiqueta });
  let count = 0;

  if (productos.hasNext()) {
    print(`\n🏷️ PRODUCTOS CON ETIQUETA "${etiqueta}":`);
    print("-".repeat(50));
    productos.forEach(doc => {
      count++;
      print(`\n${count}. ${doc.nombre}`);
      print(`   💰 Precio: ${doc.precio}€`);
      print(`   📦 Stock: ${doc.stock}`);
      print(`   🏷️ Todas las etiquetas: ${doc.etiquetas.join(", ")}`);
    });
  } else {
    print(`\n❌ No se encontraron productos con la etiqueta "${etiqueta}"`);
  }

  print("\n📊 RESULTADO:");
  print(`   🔍 Productos encontrados: ${count}`);
  print(`   🏷️ Etiqueta buscada: ${etiqueta}`);

  return count;
}

// ==============================================
// FUNCIONES UPDATE (Actualizar)
// ==============================================

/**
 * Actualiza el precio de un producto específico
 * @returns {Object} Resultado con matchedCount y modifiedCount
 */
async function doActualizarPrecio() {
  print("\n" + "=".repeat(50));
  print("✏️ OPERACIÓN: Actualizar precio de producto");
  print("=".repeat(50));

  let nombre = await leerInput("Nombre del producto: ");
  let nuevoPrecio = parseFloat(await leerInput("Nuevo precio: "));

  // Buscar producto antes de actualizar (para mostrar el precio anterior)
  let productoAntes = db.productos.findOne({ nombre: nombre });

  let resultado = db.productos.updateOne(
    { nombre: nombre },
    { $set: { precio: nuevoPrecio } }
  );

  print("\n📊 RESULTADO:");
  print(`   🔍 Documentos encontrados: ${resultado.matchedCount}`);
  print(`   ✏️ Documentos modificados: ${resultado.modifiedCount}`);

  if (resultado.modifiedCount > 0) {
    print(`   ✅ Precio actualizado correctamente`);
    print(`   📦 Producto: ${nombre}`);
    print(`   💰 Precio anterior: ${productoAntes.precio}€`);
    print(`   💰 Precio nuevo: ${nuevoPrecio}€`);
    let diferencia = nuevoPrecio - productoAntes.precio;
    let porcentaje = ((diferencia / productoAntes.precio) * 100).toFixed(2);
    print(`   📈 Variación: ${diferencia > 0 ? '+' : ''}${diferencia}€ (${porcentaje}%)`);
  } else if (resultado.matchedCount > 0 && resultado.modifiedCount === 0) {
    print(`   ⚠️ El producto ya tenía el precio ${nuevoPrecio}€`);
  } else {
    print(`   ❌ No se encontró el producto "${nombre}"`);
  }

  return resultado;
}

/**
 * Aumenta el stock de todos los productos de una categoría en 10 unidades
 * @param {string} categoria - Categoría a actualizar (default: 'ofertas')
 * @returns {Object} Resultado con matchedCount y modifiedCount
 */
async function doAumentarStockCategoria(categoria = "ofertas") {
  print("\n" + "=".repeat(50));
  print(`✏️ OPERACIÓN: Aumentar stock +10 a categoría "${categoria}"`);
  print("=".repeat(50));

  // Obtener productos antes de actualizar
  let productosAntes = db.productos.find({ categoria: categoria }).toArray();

  let resultado = db.productos.updateMany(
    { categoria: categoria },
    { $inc: { stock: 10 } }
  );

  print("\n📊 RESULTADO:");
  print(`   🔍 Documentos encontrados: ${resultado.matchedCount}`);
  print(`   ✏️ Documentos modificados: ${resultado.modifiedCount}`);
  print(`   📦 Productos afectados:`);

  if (resultado.modifiedCount > 0) {
    productosAntes.forEach((producto, index) => {
      let stockNuevo = producto.stock + 10;
      print(`      ${index + 1}. ${producto.nombre}: ${producto.stock} → ${stockNuevo} unidades (+10)`);
    });
  } else if (resultado.matchedCount === 0) {
    print(`      ❌ No hay productos en la categoría "${categoria}"`);
  } else {
    print(`      ⚠️ No se modificó ningún producto (posiblemente ya tenían el stock actualizado)`);
  }

  return resultado;
}

/**
 * Añade una nueva etiqueta a un producto existente
 * @returns {Object} Resultado con matchedCount y modifiedCount
 */
async function doAnadirEtiqueta() {
  print("\n" + "=".repeat(50));
  print("✏️ OPERACIÓN: Añadir etiqueta a producto");
  print("=".repeat(50));

  let nombre = await leerInput("Nombre del producto: ");
  let etiqueta = await leerInput("Nueva etiqueta: ");

  // Obtener producto antes de actualizar
  let productoAntes = db.productos.findOne({ nombre: nombre });

  let resultado = db.productos.updateOne(
    { nombre: nombre },
    { $push: { etiquetas: etiqueta } }
  );

  print("\n📊 RESULTADO:");
  print(`   🔍 Documentos encontrados: ${resultado.matchedCount}`);
  print(`   ✏️ Documentos modificados: ${resultado.modifiedCount}`);

  if (resultado.modifiedCount > 0) {
    print(`   ✅ Etiqueta añadida correctamente`);
    print(`   📦 Producto: ${nombre}`);
    print(`   🏷️ Etiquetas anteriores: ${productoAntes.etiquetas.join(", ") || "ninguna"}`);
    print(`   🏷️ Etiqueta añadida: ${etiqueta}`);
    print(`   🏷️ Etiquetas actuales: ${[...productoAntes.etiquetas, etiqueta].join(", ")}`);
  } else if (resultado.matchedCount > 0 && resultado.modifiedCount === 0) {
    print(`   ⚠️ El producto ya tenía la etiqueta "${etiqueta}"`);
  } else {
    print(`   ❌ No se encontró el producto "${nombre}"`);
  }

  return resultado;
}

/**
 * Desactiva todos los productos sin stock (activo: false)
 * @returns {Object} Resultado con matchedCount y modifiedCount
 */
async function doDesactivarProductosSinStock() {
  print("\n" + "=".repeat(50));
  print("✏️ OPERACIÓN: Desactivar productos sin stock");
  print("=".repeat(50));

  // Obtener productos sin stock antes de actualizar
  let productosSinStock = db.productos.find({ stock: 0 }).toArray();

  let resultado = db.productos.updateMany(
    { stock: 0 },
    { $set: { activo: false } }
  );

  print("\n📊 RESULTADO:");
  print(`   🔍 Documentos encontrados (stock = 0): ${resultado.matchedCount}`);
  print(`   ✏️ Documentos desactivados: ${resultado.modifiedCount}`);

  if (resultado.modifiedCount > 0) {
    print(`   ⚠️ Productos desactivados:`);
    productosSinStock.forEach((producto, index) => {
      print(`      ${index + 1}. ${producto.nombre} - Stock: ${producto.stock} unidades`);
    });
  } else if (resultado.matchedCount === 0) {
    print(`   ✅ No hay productos sin stock. ¡Todos tienen inventario disponible!`);
  } else {
    print(`   ⚠️ Los productos ya estaban desactivados`);
  }

  return resultado;
}

// ==============================================
// FUNCIONES DELETE (Eliminar)
// ==============================================

/**
 * Elimina un producto por su nombre
 * @returns {Object} Resultado con deletedCount
 */
async function doEliminarProductoPorNombre() {
  print("\n" + "=".repeat(50));
  print("🗑️ OPERACIÓN: Eliminar producto por nombre");
  print("=".repeat(50));

  let nombre = await leerInput("Nombre del producto a eliminar: ");

  // Obtener producto antes de eliminar (para mostrar info)
  let productoAEliminar = db.productos.findOne({ nombre: nombre });

  let resultado = db.productos.deleteOne({ nombre: nombre });

  print("\n📊 RESULTADO:");
  print(`   🗑️ Documentos eliminados: ${resultado.deletedCount}`);

  if (resultado.deletedCount > 0) {
    print(`   ✅ Producto eliminado correctamente`);
    print(`   📦 Nombre: ${productoAEliminar.nombre}`);
    print(`   💰 Precio: ${productoAEliminar.precio}€`);
    print(`   🏷️ Categoría: ${productoAEliminar.categoria}`);
    print(`   📦 Stock: ${productoAEliminar.stock} unidades`);
  } else {
    print(`   ❌ No se encontró el producto "${nombre}"`);
  }

  return resultado;
}

/**
 * Elimina todos los productos de la categoría 'ofertas'
 * @returns {Object} Resultado con deletedCount
 */
async function doEliminarTodosProductosOfertas() {
  print("\n" + "=".repeat(50));
  print("🗑️ OPERACIÓN: Eliminar todos los productos de ofertas");
  print("=".repeat(50));

  // Obtener productos de ofertas antes de eliminar
  let productosOfertas = db.productos.find({ categoria: "ofertas" }).toArray();

  if (productosOfertas.length === 0) {
    print("\n❌ No hay productos en la categoría 'ofertas'");
    return { deletedCount: 0 };
  }

  print(`\n⚠️ PRODUCTOS QUE SERÁN ELIMINADOS (${productosOfertas.length}):`);
  print("-".repeat(50));
  productosOfertas.forEach((producto, index) => {
    print(`${index + 1}. ${producto.nombre} - ${producto.precio}€`);
  });

  let confirmacion = await leerInput("\n¿Estás seguro? (escribe 'SI' para confirmar): ");

  if (confirmacion === "SI") {
    let resultado = db.productos.deleteMany({ categoria: "ofertas" });

    print("\n📊 RESULTADO:");
    print(`   🗑️ Documentos eliminados: ${resultado.deletedCount}`);
    print(`   ✅ Categoría 'ofertas' vaciada completamente`);

    // Calcular valor total de productos eliminados
    let valorTotal = productosOfertas.reduce((sum, p) => sum + p.precio, 0);
    print(`   💰 Valor total de productos eliminados: ${valorTotal.toFixed(2)}€`);

    return resultado;
  } else {
    print("\n❌ Operación cancelada. No se eliminó ningún producto.");
    return { deletedCount: 0 };
  }
}

// ==============================================
// MENÚ PRINCIPAL
// ==============================================

function mostrarMenu() {
  print("\n" + "=".repeat(55));
  print("📋 CRUD MONGODB - TIENDA");
  print("=".repeat(55));
  print("🏗️ CREATE (Insertar):");
  print("  1. Insertar 1 producto individual");
  print("  2. Insertar 3 productos de ofertas");
  print("\n📖 READ (Consultar):");
  print("  3. Listar todos los productos");
  print("  4. Buscar productos < 50€");
  print("  5. Buscar por categoría con stock > 0");
  print("  6. Buscar valoración ≥ 4.0 ⭐");
  print("  7. Buscar por etiqueta");
  print("\n✏️ UPDATE (Actualizar):");
  print("  8. Actualizar precio de un producto");
  print("  9. Aumentar stock +10 a categoría");
  print("  10. Añadir etiqueta a producto");
  print("  11. Desactivar productos sin stock");
  print("\n🗑️ DELETE (Eliminar):");
  print("  12. Eliminar producto por nombre");
  print("  13. Eliminar todos los productos ofertas");
  print("\n🚪 0. Salir");
  print("=".repeat(55));
}

// ==============================================
// EJECUCIÓN DEL MENÚ
// ==============================================

async function main() {
  let continuar = true;
  let operacionesRealizadas = 0;

  print("\n" + "🎉".repeat(20));
  print("   BIENVENIDO AL SISTEMA CRUD DE TIENDA");
  print("🎉".repeat(20));

  while (continuar) {
    mostrarMenu();
    let opcion = await leerInput("\n📌 Selecciona una opción (0-13): ");

    // Contador de operaciones (excluyendo consultas y salida)
    if (opcion !== "0" && opcion !== "3" && opcion !== "4" && opcion !== "5" && opcion !== "6" && opcion !== "7") {
      operacionesRealizadas++;
    }

    switch (opcion) {
      // CREATE
      case "1": await doInsertarUnProducto(); break;
      case "2": await doInsertarTresProductosOfertas(); break;

      // READ
      case "3": await doListarTodosProductos(); break;
      case "4": await doBuscarPrecioMenor50(); break;
      case "5": await doBuscarCategoriaConStock(); break;
      case "6": await doBuscarValoracionAlta(); break;
      case "7": await doBuscarPorEtiqueta(); break;

      // UPDATE
      case "8": await doActualizarPrecio(); break;
      case "9": await doAumentarStockCategoria(); break;
      case "10": await doAnadirEtiqueta(); break;
      case "11": await doDesactivarProductosSinStock(); break;

      // DELETE
      case "12": await doEliminarProductoPorNombre(); break;
      case "13": await doEliminarTodosProductosOfertas(); break;

      // SALIR
      case "0":
        print("\n" + "=".repeat(50));
        print("📊 ESTADÍSTICAS DE LA SESIÓN:");
        print(`   🔄 Operaciones de escritura realizadas: ${operacionesRealizadas}`);
        print(`   📦 Total de productos en la colección: ${db.productos.countDocuments()}`);
        print("\n👋 ¡Hasta luego!");
        print("=".repeat(50));
        continuar = false;
        break;

      default:
        print("\n❌ Opción no válida. Por favor, elige un número del 0 al 13");
    }

    if (continuar && opcion !== "0") {
      await pausar();
    }
  }
}

async function preguntarAvanzado() {
  let respuesta = await leerInput("\n🔥 ¿Ejecutar consultas avanzadas? (s/n): ");
  if (respuesta.toLowerCase() === 's') {
    print("\n📂 Cargando consultas avanzadas...");
    load("/tmp/advanced.js");
  }
}

// Llamar esta función después de main()
main().then(async () => {
  await preguntarAvanzado();
  rl.close();  // ← Cerrar SOLO al final
});