db.auth("david", "david97");
db = db.getSiblingDB('tienda');

// 3.1 Create
print('\n=== 1) Insertar un producto individual ===');
let res1 = db.productos.insertOne({
  nombre: 'Mouse inalámbrico',
  precio: 24.99,
  categoria: 'electrónica',
  stock: 35,
  valoracion: 4.3,
  activo: true,
  etiquetas: ['oficina', 'periféricos'],
  creado_lo: new Date()
});
printjson(res1);

print('\n=== 2) Insertar 3 productos de ofertas ===');
let res2 = db.productos.insertMany([
  {
    nombre: 'Cargador USB-C',
    precio: 14.99,
    categoria: 'ofertas',
    stock: 20,
    valoracion: 4.1,
    activo: true,
    etiquetas: ['cable', 'movilidad'],
    creado_lo: new Date()
  },
  {
    nombre: 'Teclado mecánico',
    precio: 49.99,
    categoria: 'ofertas',
    stock: 15,
    valoracion: 4.5,
    activo: true,
    etiquetas: ['gaming', 'oficina'],
    creado_lo: new Date()
  },
  {
    nombre: 'Webcam HD',
    precio: 39.99,
    categoria: 'ofertas',
    stock: 18,
    valoracion: 4.2,
    activo: true,
    etiquetas: ['videollamada', 'trabajo'],
    creado_lo: new Date()
  }
]);
printjson(res2);

// 3.2 Read
print('\n=== 3) Listar todos los productos ===');
printjson(db.productos.find().toArray());

print('\n=== 4) Productos con precio inferior a 50 ===');
printjson(db.productos.find({ precio: { $lt: 50 } }).toArray());

print('\n=== 5) Productos de una categoría específica con stock > 0 ===');
printjson(db.productos.find({ categoria: 'electrónica', stock: { $gt: 0 } }).toArray());

print('\n=== 6) Productos con valoración >= 4.0 mostrando solo nombre, precio y valoración ===');
printjson(
  db.productos.find(
    { valoracion: { $gte: 4.0 } },
    { _id: 0, nombre: 1, precio: 1, valoracion: 1 }
  ).toArray()
);

print('\n=== 7) Productos por etiqueta ===');
printjson(db.productos.find({ etiquetas: 'oficina' }).toArray());

// 3.3 Update
print('\n=== 8) Actualizar el precio de un producto específico ===');
let res8 = db.productos.updateOne(
  { nombre: 'Mouse inalámbrico' },
  { $set: { precio: 19.99 } }
);
printjson(res8);

print('\n=== 9) Aumentar el stock de todos los productos de una categoría en 10 ===');
let res9 = db.productos.updateMany(
  { categoria: 'electrónica' },
  { $inc: { stock: 10 } }
);
printjson(res9);

print('\n=== 10) Añadir una nueva etiqueta a un producto existente ===');
let res10 = db.productos.updateOne(
  { nombre: 'Mouse inalámbrico' },
  { $addToSet: { etiquetas: 'rebajado' } }
);
printjson(res10);

print('\n=== 11) Desactivar productos sin stock ===');
let res11 = db.productos.updateMany(
  { stock: { $lte: 0 } },
  { $set: { activo: false } }
);
printjson(res11);

// 3.4 Delete
print('\n=== 12) Eliminar un producto por nombre ===');
let res12 = db.productos.deleteOne({ nombre: 'Mouse inalámbrico' });
printjson(res12);

print('\n=== 13) Eliminar todos los productos de la categoría ofertas ===');
let res13 = db.productos.deleteMany({ categoria: 'ofertas' });
printjson(res13);