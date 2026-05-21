## Bloque 1 

# Preguntes teòriques

## 1) Quina és la diferència entre `docker run` i `docker compose up`?

# docker run 
se utiliza para crear y encender un único contenedor de forma aislada desde la línea de comandos. Por el contrario, 
# docker compose up 
lee un archivo de configuración (docker-compose.yml) para levantar todo un ecosistema de contenedores (redes, volúmenes y múltiples servicios) que trabajan juntos.

## Ejemplo:

Con docker run tendrías que escribir en la terminal un comando larguísimo solo para encender la base de datos: docker run --name mi-mongo -p 27017:27017 -d mongo:7.0.

Con docker compose up, ejecutas ese comando corto y él solo lee el archivo para levantar tanto mongodb como mongoexpress al mismo tiempo, conectados en su red correspondiente.

## 2) Per a què serveix la instrucció `depends_on`? Garanteix que el servei dependent estigui completament operatiu?

### `depends_on`
Sirve para indicar el orden de arranque entre servicios. Por ejemplo, puedes hacer que MongoDB se inicie antes que otro contenedor que lo necesita.

### ¿Garantiza que esté operativo?
No. `depends_on` solo asegura que el contenedor se inicie antes que otro, pero no verifica que el servicio interno esté completamente listo para aceptar conexiones.

## 3) Explica cuál es la diferencia entre una red bridge por defecto y una red personalizada con nombre en Docker Compose

### Red bridge por defecto
- En la red bridge por defecto, los contenedores no pueden encontrarse entre sí usando sus nombres; tendrías que averiguar sus IPs internas (que cambian cada vez que apagas el ordenador).

### Red personalizada
- Se define explícitamente en `docker-compose.yml`.
- Los contenedores pueden comunicarse usando el nombre del servicio.
- Ofrece más control, mejor organización y mayor aislamiento.

### Ejemplo
Gracias a que utilizamos la red personalizada red-tienda, en la configuración de mongoexpress puedes escribir la URL de conexión como mongodb://david:david97@mongodb:27017/. Docker traduce automáticamente la palabra mongodb por la IP interna correcta del contenedor de la base de datos.

# BLOQUE 2

# Pantallazos:

1. Engega l'entorn: docker compose up -d

![alt text](compose.png)

2. Accedeix a Mongo Express (http://localhost:8081) i verifica que existeix la BD botiga

![alt text](tienda.png)

3. Atura i elimina els contenidors: docker compose down

![alt text](down.png)

4. Torna a engegar: docker compose up -d

![alt text](compose4.png)

5. Verifica que les dades encara existeixen

![alt text](datos.png)

# Preguntes teòriques

1. Què passaria si no definíssim cap volum al docker-compose.yml? Fes la prova i
documenta el resultat.

Si no defines ningún volumen en docker-compose.yml, los datos se guardan dentro del contenedor y se pierden al eliminarlo o recrearlo. 

En la práctica, eso significa que tras docker compose down y volver a levantar el entorno, la base de datos tienda volvería vacía o con los datos iniciales del script, según cómo arranques el contenedor. 

Docker explica que los bind mounts y named volumes son precisamente los mecanismos para persistir datos fuera del ciclo de vida del contenedor.


2. Explica la diferència entre un volum named (amb nom) i un bind mount (ruta del host). Quan convé usar cada un?

Un named volume lo gestiona Docker y no depende de una ruta concreta del host, así que es más portable y limpio para datos persistentes como bases de datos. 

Un bind mount enlaza una carpeta real del host con el contenedor, lo que es más cómodo en desarrollo porque ves y editas los archivos directamente desde tu máquina. 

Para una base de datos suele convenir named volume por robustez y portabilidad; para código o configuración editable, conviene bind mount.

3. Explica la diferència entre l’estratègia embedding i l’estratègia referència amb exemples.
Cal que els exemples siguin diferents dels que s’exposen en aquest document.

# EMBEDDING (Documentos Anidados)

Técnicamente, significa meter un documento de datos dentro de otro en un solo archivo JSON, utilizando objetos o listas (arrays). Los datos viven juntos en el mismo espacio de memoria.

frese:
"Embedding es guardar los datos relacionados juntos en el mismo documento para poder leerlos todos de golpe con una velocidad brutal."

# REFERENCIA (Normalización o Enlaces)

Técnicamente, significa separar los datos en colecciones distintas y unirlos mediante un identificador único (como un _id o un email) que apunta de un documento a otro. Es el equivalente a las Claves Foráneas (Foreign Keys) del mundo SQL.

frase:
"Referencia es separar los datos en colecciones diferentes conectadas por un ID, evitando que la información se duplique y facilitando que se actualice en un solo lugar"


4. Explica quina estratègia o estratègies has fet servir en la col·lecció comandes i per quin
motiu.

# pedidos referencia - embedding 

En este modelo de negocio, la colección pedidos actúa como el puente de unión entre clientes y productos.

Técnicamente, no existe ninguna relación directa ni campos compartidos entre un cliente y un producto por sí solos: un producto no sabe qué clientes lo han comprado, y un cliente no tiene una lista de productos en su perfil. Esa conexión solo "nace" cuando se genera una transacción (un pedido).

# Bloque 3 

para ejecutar CRUD.js:

docker compose down
docker compose up -d

docker cp ./queries/CRUD.js mongodb-tienda:/tmp/CRUD.js

docker exec -it mongodb-tienda mongosh -u david -p david97 --authenticationDatabase admin --eval 'load("/tmp/CRUD.js")'

# eliminar todos los volumenes no usados 

docker volume prune -f 

# preguntas teoricas bloque 3

1. Tal com has creat la col·lecció de productes, el seu nom és únic? Justifica la resposta.

No. En MongoDB, los nombres de colección solo deben ser únicos dentro de la misma base de datos. Puedes tener productos en tienda y también productos en ventas sin problema.

2. Què significa el terme “projectar” en les consultes? Explica-ho amb un exemple diferent del
d’aquest enunciat.

Seleccionar solo los campos que quieres ver, ocultando el resto. Lo cual es genual para proteger datos sensibles o que no, nos interesen.

// Mostrar solo nombre y email de clientes (ocultar _id, teléfono, dirección)

Ejemplo: Si tienes una colección de alumnos y solo quieres ver sus nombres sin ver sus notas ni sus correos:
```bash
db.alumnos.find({}, { nombre: 1, _id: 0 })
```
(El 1 significa "muéstralo" y el 0 significa "ocúltalo").

3. Llista totes les funcions i operadors que hagis utilitzat en les consultes, explica el seu
significat i descriu un exemple d’ús diferent dels exemples d’aquest enunciat.

insertOne() / Inserta 1 documento en la coleccion

Ejemplo: Registrar un nuevo usuario en una plataforma de cursos.

```bash
``` db.usuarios.insertOne({ nombre: "Elena", rol: "estudiante", cursos_activos: 2 });```

insertMany() / Guarda una lista (array) de varios documentos a la vez.

ejemplo: Cargar un lote de nuevos libros en una biblioteca digital.

```bash
db.libros.insertMany([
  { titulo: "Don Quijote", stock: 3 },
  { titulo: "Cien años de soledad", stock: 5 }
]);
```

find() / Busca documentos en una coleccion

ejemplo: como en una biblioteca buscarias libros por autor 

```bash
db.libros.find({ autor: "Cervantes" })
```

findOne() / Busca en la colección y te devuelve solo el primer documento que coincida con el filtro.

Ejemplo: Buscar la ficha de un empleado usando su identificador único.

```bash 
db.empleados.findOne({ dni: "12345678A" });
```

$lt / Menor que

$gt / Mayor que

```bash
db.productos.find({ precio: { $gt: 50 } })
```

$gte / Mayor o igual que

updateOne() / Modifica el primer documento que cumpla la condición.

Ejemplo: Cambiar el estado de un envío específico a "entregado".

```bash
  db.envios.updateOne({ id_envio: 9942 }, { $set: { estado: "entregado" });
```

updateMany() / Modifica todos los documentos que cumplan la condición de golpe.

Ejemplo: Aplicar un descuento generalizado a todos los productos de la categoría 'outlet'.

```bash
db.productos.updateMany({ categoria: "outlet" }, { $set: { descuento: true } });
```

$set / Establece valor de un campo

```bash
db.usuarios.updateOne({ email: "ana@ejemplo.com" }, { $set: { estado: "activo" } })
```

$inc / Incrementa valor numérico

$push / Añade elemento a array

deleteOne() / Borra el primer documento que coincida con el filtro.

Ejemplo: Eliminar una cuenta de usuario específica que solicitó la baja.

```bash
db.usuarios.deleteOne({ email: "baja@example.com" });
```

deleteMany() / Borra todos los documentos que cumplan la condición.

Ejemplo: Limpiar el historial eliminando todas las alertas del sistema que sean del año pasado.

```bash
db.alertas.deleteMany({ anio: 2025 });
```

Proyección / El segundo argumento del find(). Define con un 1 los campos que quieres recibir y con un 0 los que quieres ocultar.

ejemplo:
db.productos.find(
  { precio: { $lt: 50 } },  // ← Filtro (1er argumento)
  { nombre: 1, precio: 1, _id: 0 }  // ← Proyección (2do argumento)
)

# bloque 4 advanced.js 

# ante algun cambio en crud:
docker cp ./queries/CRUD.js mongodb-tienda:/tmp/CRUD.js

# ante algun cambio en advanced.js
docker cp ./queries/advanced.js mongodb-tienda:/tmp/advanced.js

# 1. Asegurar contenedores
docker-compose up -d

# Ejecutar CRUD

docker exec -it mongodb-tienda mongosh -u david -p david97 --authenticationDatabase admin --eval 'load("/tmp/CRUD.js")'

1. Quan pot ser perjudicial tenir massa índexs en una col·lecció? Explica el compromís
(trade-off) entre lectura i escriptura.

Tener demasiados índices es perjudicial cuando predominan las operaciones de escritura (INSERT, UPDATE, DELETE), porque cada modificación en la colección obliga a actualizar todos los índices, ralentizando significativamente el rendimiento.
Además, consumen más RAM, espacio en disco y aumentan el tiempo de los backups. 

Existe un trade-off entre lectura y escritura: los índices aceleran las consultas (reads) pero frenan las modificaciones (writes). 
Por eso, lo recomendable es crear solo los índices necesarios para las consultas más frecuentes, generalmente entre 3 y 5 por colección.

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

countDocuments()	Cuenta cuántos documentos cumplen una condición exacta.

  Ejemplo: Saber cuántos alumnos han suspendido un examen (nota menor a 5).

```bash
db.alumnos.countDocuments({ nota: { $lt: 5 } });
```

aggregate()	Realiza consultas complejas con etapas a traves de |

Ejemplo: Calcular los ingresos totales por categoría de producto.


# 🔹 Operadores de comparación

$lt	Menor que

```bash
db.vehiculos.find({ precio: { $lt: 10000 } }); // Coches de menos de 10.000€
```

$gt	Mayor que
```bash
db.vehiculos.find({ precio: { $gt: 50000 } }); // Coches de más de 50.000€
```

$gte	Mayor o igual que
```bash
db.vehiculos.find({ precio: { $gte: 50000 } }); // Coches de 50.000€ enadelante
```

$lte	Menor o igual que

```bash
db.vehiculos.find({ precio: { $lte: 10000 } }); // Coches de 10.000€ o menos
```

# 🔹 Operadores lógicos

$and	Cumple TODAS las condiciones

Ejemplo: Buscar ofertas de trabajo en Barcelona que paguen más de 30.000€.

```bash
db.ofertas.find({
  $and: [
    { ciudad: "Barcelona" },
    { salario: { $gt: 30000 } }
  ]
});
```

$or	Cumple AL MENOS UNA condición

Ejemplo: Buscar vuelos que vayan hacia París o hacia Londres.

```bash
db.vuelos.find({
  $or: [
    { destino: "París" },
    { destino: "Londres" }
  ]
});
```

# 🔹 Operadores de texto y arrays

$regex	Permite buscar texto mediante patrones o expresiones regulares (sin necesidad de escribir la palabra exacta).

```bash
db.usuarios.find({ nombre: { $regex: /^Mar/ } }) 
```
Ejemplo: (Busca todos los usuarios cuyo nombre empiece por "Mar", como María o Marcos).

$push	Añade un elemento al final de un array (lista).

Ejemplo: Añadir una nueva fobia al expediente de un paciente.
```bash
db.pacientes.updateOne({ nombre: "Tomás" }, { $push: { fobias: "Aracnofobia" } });
```

$inc	Incrementa (o disminuye, si usas números negativos) un valor numérico.

Ejemplo: Sumar 1 punto de experiencia a un personaje de un videojuego.

```bash
db.jugadores.updateOne({ usuario: "GamerPro" }, { $inc: { experiencia: 1 } });
```

$set	Asigna un valor a un campo específico. Si el campo no existe, lo crea.

Ejemplo: Cambiar el número de teléfono de un hotel.

```bash
db.hoteles.updateOne({ nombre: "Hotel Central" }, { $set: { telefono: "933000111" } });
```

# 🔹 Operadores de agregación ($group)

$group	junta los documentos por una clave común.

$sum	Suma valores

$avg	Calcula promedio

ejemplo: Agrupar una empresa por "departamento" para ver cuántos empleados tiene y cuál es el salario promedio.

```bash
db.empleados.aggregate([
  {
    $group: {
      _id: "$departamento",             // Agrupa por este campo
      numero_empleados: { $sum: 1 },    // Cuenta cuántos hay en total
      salario_medio: { $avg: "$salario" } // Calcula el promedio de sus salarios
    }
  }
]);
```

$sort	Ordena resultados (1=ascendente, -1=descendente)
Ejemplo: Listar los coches del concesionario del más caro al más barato.

```db.coches.find().sort({ precio: -1 });```

$limit	Corta el resultado para mostrar únicamente el número de documentos indicado.

Ejemplo: Mostrar el "Top 3" de jugadores con mayor puntuación de una tabla clasificatoria.

db.ranking.find().sort({ puntos: -1 }).limit(3);

# 🔹 Funciones de índices

createIndex()	Crea un índice para acelerar consultas

Ejemplo:  (Hace que buscar un coche por su matrícula sea instantáneo).
```bash
db.autos.createIndex({ matricula: 16540 })
```

getIndexes()	Lista todos los índices de la colección

```bash
db.inventario.getIndexes();
```

dropIndex()	Elimina un índice

Ejemplo: Borrar el índice antiguo de códigos de barras.
```bash
db.inventario.dropIndex("codigo_barra_1");
```

explain()	Muestra cómo MongoDB ejecuta una consulta

Ejemplo: Auditar una consulta de facturas caras para ver si es eficiente.

```bash
db.facturas.find({ total: { $gt: 5000 } }).explain("executionStats");
```

# 🔹 Funciones de texto

$text	Realiza una búsqueda avanzada por palabras clave (necesita que hayas creado previamente un índice de tipo "text"). Es capaz de entender frases completas.

Ejemplo: Buscar recetas de cocina que incluyan "tarta" y "manzana".

```bash 
db.recetas.find({ $text: { $search: "tarta manzana" } }); `

$search	Palabra o frase a buscar en índice de texto

# 🔹 Funciones auxiliares (mongosh)

print()	Muestra texto en consola

printjson()	Muestra JSON formateado

```JavaScript
print("--- INICIANDO AUDITORÍA ---");
let miDocumento = db.clientes.findOne();
printjson(miDocumento);
``` 

toArray()	Convierte un cursor (los resultados de un find()) en un array clásico de JavaScript para poder manipularlo con código.

Ejemplo: Guardar los resultados en una variable manipulable.

```JavaScript
let listaMotos = db.motos.find({ cilindrada: 125 }).toArray();
print("La primera moto es: " + listaMotos[0].modelo);
```

hasNext()	Pregunta al cursor: "¿Todavía te quedan documentos por mostrar en la lista?". Devuelve true o false. Se usa en bucles while.

Ejemplo: Recorrer todos los usuarios uno a uno.

```JavaScript
let miCursor = db.usuarios.find();
while (miCursor.hasNext()) {
    let documento = miCursor.next();
    print(documento.nombre);
}
```