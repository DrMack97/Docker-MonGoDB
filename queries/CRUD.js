const db = db.getSiblingDB('tienda');

// Crear
db.productos.insertOne({
  nom: 'Mochila urbana',
  preu: 39.99,
  categoria: 'esport',
  estoc: 20,
  valoracio: 4.7,
  actiu: true,
  etiquetes: ['viaje', 'ciudad'],
  creat_el: new Date()
});

// Leer
db.productos.find({ categoria: 'esport' });

// Actualizar
db.productos.updateOne(
  { nom: 'Mochila urbana' },
  { $set: { estoc: 25 } }
);

// Borrar
db.productos.deleteOne({ nom: 'Mochila urbana' });