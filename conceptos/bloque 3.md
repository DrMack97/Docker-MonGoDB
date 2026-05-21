# preguntas teoricas bloque 3

1. Tal com has creat la col·lecció de productes, el seu nom és únic? Justifica la resposta.

No. En MongoDB, los nombres de colección solo deben ser únicos dentro de la misma base de datos. Puedes tener productos en tienda y también productos en ventas sin problema.

2. Què significa el terme “projectar” en les consultes? Explica-ho amb un exemple diferent del
d’aquest enunciat.

Seleccionar solo los campos que quieres ver, ocultando el resto. 

// Mostrar solo nombre y email de clientes (ocultar _id, teléfono, dirección)

3. Llista totes les funcions i operadors que hagis utilitzat en les consultes, explica el seu
significat i descriu un exemple d’ús diferent dels exemples d’aquest enunciat.

insertOne() / Inserta 1 documento

insertMany() / Inserta varios documentos

find() / Busca documentos

findOne() / Busca 1 documento

$lt / Menor que

$gt / Mayor que

$gte / Mayor o igual que

updateOne() / Actualiza 1 documento

updateMany() / Actualiza varios

$set / Establece valor de un campo

$inc / Incrementa valor numérico

$push / Añade elemento a array

deleteOne() / Elimina 1 documento

deleteMany() / Elimina varios

Proyección / Campos a mostrar/ocultar

db.productos.find(
  { precio: { $lt: 50 } },  // ← Filtro (1er argumento)
  { nombre: 1, precio: 1, _id: 0 }  // ← Proyección (2do argumento)
)