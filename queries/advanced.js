// ==============================================
// 14. $and - Productos activos con precio entre 20€ y 100€
// ==============================================
async function doBuscarAnd() {
    print("\n" + "=".repeat(50));
    print("🔍 CONSULTA 14: $and - Productos activos con precio entre 20€ y 100€");
    print("=".repeat(50));

    let resultados = db.productos.find({
        $and: [
            { activo: true },
            { precio: { $gte: 20, $lte: 100 } }
        ]
    });

    let count = 0;
    if (resultados.hasNext()) {
        print("\n📦 RESULTADOS:");
        resultados.forEach(doc => {
            count++;
            print(`${count}. ${doc.nombre} - ${doc.precio}€ - Activo: ${doc.activo}`);
        });
    } else {
        print("❌ No hay productos activos entre 20€ y 100€");
    }

    print(`\n📊 Total encontrados: ${count}`);
    return count;
}

// ==============================================
// 15. $or - Productos de categoría 'electrónica' o valoración >= 4.5
// ==============================================
async function doBuscarOr() {
    print("\n" + "=".repeat(50));
    print("🔍 CONSULTA 15: $or - Electrónica O valoración ≥ 4.5");
    print("=".repeat(50));

    let resultados = db.productos.find({
        $or: [
            { categoria: "electrónica" },
            { valoracion: { $gte: 4.5 } }
        ]
    });

    let count = 0;
    if (resultados.hasNext()) {
        print("\n📦 RESULTADOS:");
        resultados.forEach(doc => {
            count++;
            print(`${count}. ${doc.nombre} - ${doc.categoria} - ⭐${doc.valoracion || "sin valoración"}`);
        });
    } else {
        print("❌ No hay productos que cumplan las condiciones");
    }

    print(`\n📊 Total encontrados: ${count}`);
    return count;
}

// ==============================================
// 16. $regex - Buscar productos cuyo nombre contenga una palabra clave
// ==============================================
async function doBuscarRegex() {
    let palabra = await leerInput("📝 Palabra clave a buscar en el nombre: ");

    print("\n" + "=".repeat(50));
    print(`🔍 CONSULTA 16: $regex - Productos que contengan "${palabra}"`);
    print("=".repeat(50));

    let resultados = db.productos.find({
        nombre: { $regex: palabra, $options: "i" } // "i" = mayúsculas/minúsculas
    });

    let count = 0;
    if (resultados.hasNext()) {
        print("\n📦 RESULTADOS:");
        resultados.forEach(doc => {
            count++;
            print(`${count}. ${doc.nombre} - ${doc.precio}€`);
        });
    } else {
        print(`❌ No hay productos con "${palabra}" en el nombre`);
    }

    print(`\n📊 Total encontrados: ${count}`);
    return count;
}

// ==============================================
// 17. sort + limit - Ordenar por precio descendente, mostrar 5
// ==============================================
async function doSortLimit() {
    print("\n" + "=".repeat(50));
    print("🔍 CONSULTA 17: sort + limit - Top 5 productos más caros");
    print("=".repeat(50));

    let resultados = db.productos.find()
        .sort({ precio: -1 })  // -1 = descendente (mayor a menor)
        .limit(5);

    let count = 0;
    if (resultados.hasNext()) {
        print("\n🏆 TOP 5 MÁS CAROS:");
        resultados.forEach(doc => {
            count++;
            print(`${count}. ${doc.nombre} - ${doc.precio}€ (${doc.categoria})`);
        });
    } else {
        print("❌ No hay productos");
    }

    print(`\n📊 Mostrados: ${count} de ${db.productos.countDocuments()} totales`);
    return count;
}

// ==============================================
// 18. $group - Contar productos por categoría
// ==============================================
async function doCountPorCategoria() {
    print("\n" + "=".repeat(50));
    print("🔍 CONSULTA 18: $group - Contar productos por categoría");
    print("=".repeat(50));

    let resultados = db.productos.aggregate([
        { $group: { _id: "$categoria", total: { $sum: 1 } } },
        { $sort: { total: -1 } }  // Ordenar de mayor a menor
    ]);

    let count = 0;
    let totalProductos = 0;

    if (resultados.hasNext()) {
        print("\n📊 CANTIDAD POR CATEGORÍA:");
        resultados.forEach(doc => {
            count++;
            totalProductos += doc.total;
            print(`   ${doc._id || "📌 sin categoría"}: ${doc.total} productos`);
        });
    } else {
        print("❌ No hay productos");
    }

    print(`\n📊 Total categorías: ${count}`);
    print(`📦 Total productos: ${totalProductos}`);
    return count;
}

// ==============================================
// 19. $group + $avg - Precio medio por categoría
// ==============================================
async function doAvgPorCategoria() {
    print("\n" + "=".repeat(50));
    print("🔍 CONSULTA 19: $avg - Precio medio por categoría");
    print("=".repeat(50));

    let resultados = db.productos.aggregate([
        { $group: { _id: "$categoria", precioMedio: { $avg: "$precio" } } },
        { $sort: { precioMedio: -1 } }  // Ordenar de mayor a menor
    ]);

    let count = 0;

    if (resultados.hasNext()) {
        print("\n💰 PRECIO MEDIO POR CATEGORÍA:");
        resultados.forEach(doc => {
            count++;
            print(`   ${doc._id || "📌 sin categoría"}: ${doc.precioMedio.toFixed(2)}€`);
        });
    } else {
        print("❌ No hay productos");
    }

    print(`\n📊 Total categorías: ${count}`);
    return count;
}

// ==============================================
// 20. $group - Total gastado por cliente (usando colección pedidos)
// ==============================================
async function doTotalPorCliente() {
    print("\n" + "=".repeat(50));
    print("🔍 CONSULTA 20: Total gastado por cliente");
    print("=".repeat(50));

    // Verificar si existe la colección pedidos
    let colecciones = db.getCollectionNames();
    if (!colecciones.includes("pedidos")) {
        print("❌ No existe la colección 'pedidos'");
        print("📌 Los datos de pedidos no están disponibles");
        return 0;
    }

    let resultados = db.pedidos.aggregate([
        { $group: { _id: "$cliente_email", totalGastado: { $sum: "$total" } } },
        { $sort: { totalGastado: -1 } }
    ]);

    let count = 0;
    let totalGlobal = 0;

    if (resultados.hasNext()) {
        print("\n💸 TOTAL GASTADO POR CLIENTE:");
        print("-".repeat(40));
        resultados.forEach(doc => {
            count++;
            totalGlobal += doc.totalGastado;
            print(`${count}. ${doc._id}: ${doc.totalGastado.toFixed(2)}€`);
        });
        print("-".repeat(40));
        print(`💰 TOTAL GLOBAL: ${totalGlobal.toFixed(2)}€`);
    } else {
        print("❌ No hay pedidos registrados");
    }

    print(`\n📊 Total clientes: ${count}`);
    return count;
}

// ==============================================
// GESTIÓN DE ÍNDICES (4.2)
// ==============================================

/**
 * 21. Crear índice simple en el campo categoría
 */
async function doCrearIndiceCategoria() {
    print("\n" + "=".repeat(50));
    print("📇 CREAR ÍNDICE SIMPLE: categoría");
    print("=".repeat(50));

    let resultado = db.productos.createIndex({ categoria: 1 });

    print("\n📊 RESULTADO:");
    print(`   ✅ Índice creado: ${resultado}`);
    print(`   📌 Campo: categoría (orden ascendente)`);
    print(`   🎯 Beneficio: Acelera búsquedas por categoría`);
}

/**
 * 22. Crear índice compuesto por (categoría, precio)
 */
async function doCrearIndiceCompuesto() {
    print("\n" + "=".repeat(50));
    print("📇 CREAR ÍNDICE COMPUESTO: (categoría, precio)");
    print("=".repeat(50));

    let resultado = db.productos.createIndex({ categoria: 1, precio: -1 });

    print("\n📊 RESULTADO:");
    print(`   ✅ Índice creado: ${resultado}`);
    print(`   📌 Campos: categoria (↑), precio (↓)`);
    print(`   🎯 Beneficio: Acelera consultas que filtran por categoría y ordenan por precio`);
}

/**
 * 23. Crear índice de texto en el campo nombre (full-text search)
 */
async function doCrearIndiceTexto() {
    print("\n" + "=".repeat(50));
    print("📇 CREAR ÍNDICE DE TEXTO: nombre");
    print("=".repeat(50));

    let resultado = db.productos.createIndex({ nombre: "text" });

    print("\n📊 RESULTADO:");
    print(`   ✅ Índice de texto creado: ${resultado}`);
    print(`   📌 Campo: nombre (búsqueda full-text)`);
    print(`   🔍 Búsqueda ejemplo: db.productos.find({ $text: { $search: "portátil" } })`);
}

/**
 * 24. Comparar consulta SIN índice vs CON índice usando explain('executionStats')
 */
async function doCompararExplain() {
    print("\n" + "=".repeat(50));
    print("🔬 COMPARAR CONSULTA: SIN índice vs CON índice");
    print("=".repeat(50));

    // 1. Eliminar índices existentes para la prueba (excepto _id)
    print("\n📌 Eliminando índices existentes (excepto _id)...");
    let indices = db.productos.getIndexes();
    for (let idx of indices) {
        if (idx.name !== "_id_") {
            db.productos.dropIndex(idx.name);
            print(`   Eliminado: ${idx.name}`);
        }
    }

    // 2. Consulta SIN índice
    print("\n" + "-".repeat(40));
    print("🔍 CONSULTA SIN ÍNDICE:");
    print("-".repeat(40));

    let sinIndice = db.productos.find({ categoria: "electrónica", precio: { $gt: 50 } })
        .explain("executionStats");

    print(`📊 nDocs Examined (documentos examinados): ${sinIndice.executionStats.totalDocsExamined}`);
    print(`⏱️ Tiempo de ejecución (ms): ${sinIndice.executionStats.executionTimeMillis}`);
    print(`📦 Documentos devueltos: ${sinIndice.executionStats.nReturned}`);

    // 3. Crear índice
    print("\n" + "-".repeat(40));
    print("📇 CREANDO ÍNDICE COMPUESTO...");
    print("-".repeat(40));

    db.productos.createIndex({ categoria: 1, precio: 1 });
    print("✅ Índice creado: { categoria: 1, precio: 1 }");

    // 4. Consulta CON índice
    print("\n" + "-".repeat(40));
    print("🔍 CONSULTA CON ÍNDICE:");
    print("-".repeat(40));

    let conIndice = db.productos.find({ categoria: "electrónica", precio: { $gt: 50 } })
        .explain("executionStats");

    print(`📊 nDocs Examined (documentos examinados): ${conIndice.executionStats.totalDocsExamined}`);
    print(`⏱️ Tiempo de ejecución (ms): ${conIndice.executionStats.executionTimeMillis}`);
    print(`📦 Documentos devueltos: ${conIndice.executionStats.nReturned}`);

    // 5. Comparación
    print("\n" + "=".repeat(50));
    print("📈 COMPARACIÓN FINAL:");
    print("=".repeat(50));

    let docsSin = sinIndice.executionStats.totalDocsExamined;
    let docsCon = conIndice.executionStats.totalDocsExamined;
    let tiempoSin = sinIndice.executionStats.executionTimeMillis;
    let tiempoCon = conIndice.executionStats.executionTimeMillis;

    print(`🔍 Documentos examinados: ${docsSin} → ${docsCon}`);
    print(`⚡ Mejora: ${((docsSin - docsCon) / docsSin * 100).toFixed(2)}% menos documentos`);
    print(`⏱️ Tiempo: ${tiempoSin}ms → ${tiempoCon}ms`);

    if (docsCon < docsSin) {
        print("\n✅ CONCLUSIÓN: El índice ACELERA la consulta porque examina solo los documentos que coinciden, no toda la colección.");
    } else {
        print("\n⚠️ El índice no mejoró la consulta (posiblemente la colección es muy pequeña)");
    }
}

/**
 * 25. Listar todos los índices de la colección
 */
async function doListarIndices() {
    print("\n" + "=".repeat(50));
    print("📇 LISTAR TODOS LOS ÍNDICES de la colección 'productos'");
    print("=".repeat(50));

    let indices = db.productos.getIndexes();

    if (indices.length === 0) {
        print("❌ No hay índices definidos (solo el _id por defecto)");
    } else {
        print("\n📋 ÍNDICES ENCONTRADOS:");
        print("-".repeat(40));
        indices.forEach((idx, i) => {
            print(`\n${i + 1}. Nombre: ${idx.name}`);
            print(`   Clave: ${JSON.stringify(idx.key)}`);
            if (idx.textIndexVersion) print(`   📌 Tipo: TEXTO`);
            print(`   Espacio: ${idx.ns || "productos"}`);
        });
    }
}
// ==============================================
// MENÚ EXCLUSIVO PARA CONSULTAS AVANZADAS
// ==============================================

function mostrarMenuAvanzado() {
    print("\n" + "=".repeat(55));
    print("🔥 CONSULTAS AVANZADAS - MONGODB");
    print("=".repeat(55));
    print("  14. Activos con precio 20-100€"); //$and -
    print("  15. Electrónica o valoración ≥ 4.5"); // $or -
    print("  16. Buscar por palabra en nombre"); // $regex -
    print("  17. Top 5 más caros");                 // sort + limit -
    print("  18. Contar productos por categoría"); //$group 
    print("  19. Precio medio por categoría");      //$avg 
    print("  20. Total gastado por cliente");       //$group - 
    print("\n📇 GESTIÓN DE ÍNDICES:");
    print("  21. Crear índice simple (categoría)");
    print("  22. Crear índice compuesto (categoría, precio)");
    print("  23. Crear índice de texto (nombre)");
    print("  24. Comparar consulta con/sin índice (explain)");
    print("  25. Listar todos los índices");
    print("\n  0. Volver al menú principal");
    print("=".repeat(55));
}

// ==============================================
// EJECUTAR CONSULTAS AVANZADAS
// ==============================================

async function ejecutarConsultasAvanzadas() {
    let continuar = true;

    while (continuar) {
        mostrarMenuAvanzado();
        let opcion = await leerInput("\n📌 Selecciona una consulta (14-25 o 0): ");

        switch (opcion) {
            case "14": await doBuscarAnd(); break;
            case "15": await doBuscarOr(); break;
            case "16": await doBuscarRegex(); break;
            case "17": await doSortLimit(); break;
            case "18": await doCountPorCategoria(); break;
            case "19": await doAvgPorCategoria(); break;
            case "20": await doTotalPorCliente(); break;
            case "21": await doCrearIndiceCategoria(); break;
            case "22": await doCrearIndiceCompuesto(); break;
            case "23": await doCrearIndiceTexto(); break;
            case "24": await doCompararExplain(); break;
            case "25": await doListarIndices(); break;
            case "0":
                print("\n🔙 Volviendo al menú principal...");
                continuar = false;
                break;
            default:
                print("\n❌ Opción no válida. Elige 14-25 o 0");
        }

        if (continuar && opcion !== "0") await pausar();
    }
} 
