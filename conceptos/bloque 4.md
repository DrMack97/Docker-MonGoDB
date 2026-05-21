1. Quan pot ser perjudicial tenir massa índexs en una col·lecció? Explica el compromís
(trade-off) entre lectura i escriptura.

Tener demasiados índices es perjudicial cuando predominan las operaciones de escritura (INSERT, UPDATE, DELETE), porque cada modificación en la colección obliga a actualizar todos los índices, ralentizando significativamente el rendimiento. Además, consumen más RAM, espacio en disco y aumentan el tiempo de los backups. Existe un trade-off entre lectura y escritura: los índices aceleran las consultas (reads) pero frenan las modificaciones (writes). Por eso, lo recomendable es crear solo los índices necesarios para las consultas más frecuentes, generalmente entre 3 y 5 por colección.

2. Llista totes les funcions i operadors que hagis utilitzat en les consultes, explica el seu
significat i descriu un exemple d’ús diferent dels exemples d’aquest enunciat.

# 🔹 Funciones CRUD básicas

find()	Busca documentos que cumplen una condición

findOne()	Busca el PRIMER documento que cumple la condición

insertOne()	Inserta UN documento

insertMany()	Inserta VARIOS documentos

updateOne()	Actualiza UN documento

updateMany()	Actualiza VARIOS documentos

deleteOne()	Elimina UN documento

deleteMany()	Elimina VARIOS documentos

countDocuments()	Cuenta documentos que cumplen condición

aggregate()	Realiza consultas complejas con etapas

# 🔹 Operadores de comparación

$lt	Menor que

$gt	Mayor que

$gte	Mayor o igual que

$lte	Menor o igual que

# 🔹 Operadores lógicos

$and	Cumple TODAS las condiciones

$or	Cumple AL MENOS UNA condición

# 🔹 Operadores de texto y arrays

$regex	Busca por patrón (expresión regular)

$push	Añade elemento a un array

$inc	Incrementa valor numérico

$set	Establece el valor de un campo

# 🔹 Operadores de agregación ($group)

$group	Agrupa documentos por un campo

$sum	Suma valores

$avg	Calcula promedio

$sort	Ordena resultados (1=ascendente, -1=descendente)

$limit	Limita número de resultados

# 🔹 Funciones de índices

createIndex()	Crea un índice para acelerar consultas

getIndexes()	Lista todos los índices de la colección

dropIndex()	Elimina un índice

explain()	Muestra cómo MongoDB ejecuta una consulta

# 🔹 Funciones de texto

$text	Busca por texto (requiere índice de texto)

$search	Palabra a buscar en índice de texto

# 🔹 Funciones auxiliares (mongosh)

print()	Muestra texto en consola

printjson()	Muestra JSON formateado

toArray()	Convierte cursor a array

hasNext()	Verifica si hay más documentos