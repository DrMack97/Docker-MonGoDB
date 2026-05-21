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