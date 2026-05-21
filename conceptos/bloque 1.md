## Bloque 1 

# Preguntes teòriques

## 1) Quina és la diferència entre `docker run` i `docker compose up`?

### `docker run`
Crea y ejecuta un único contenedor a partir de una imagen, indicando la configuración desde la línea de comandos.

### `docker compose up`
Lee un archivo `docker-compose.yml` para crear, conectar y arrancar uno o varios contenedores que forman parte de una misma aplicación.

### Ámbito de uso

- Usa `docker run` cuando quieras probar una imagen rápidamente, ejecutar un contenedor puntual o lanzar un servicio independiente.

- Usa `docker compose up` cuando tu proyecto tenga varios servicios relacionados, por ejemplo una aplicación web y una base de datos.

## 2) Per a què serveix la instrucció `depends_on`? Garanteix que el servei dependent estigui completament operatiu?

### `depends_on`
Sirve para indicar el orden de arranque entre servicios. Por ejemplo, puedes hacer que MongoDB se inicie antes que otro contenedor que lo necesita.

### ¿Garantiza que esté operativo?
No. `depends_on` solo asegura que el contenedor se inicie antes que otro, pero no verifica que el servicio interno esté completamente listo para aceptar conexiones.

## 3) Explica cuál es la diferencia entre una red bridge por defecto y una red personalizada con nombre en Docker Compose

### Red bridge por defecto
- Docker asigna una red básica automáticamente.
- La comunicación entre contenedores puede ser más limitada en cuanto a resolución por nombre si no se define una red propia.
- Tiene menos control sobre configuración y aislamiento.

### Red personalizada
- Se define explícitamente en `docker-compose.yml`.
- Los contenedores pueden comunicarse usando el nombre del servicio.
- Ofrece más control, mejor organización y mayor aislamiento.

### Conclusión
En Docker Compose, una red personalizada suele ser la opción más recomendable porque facilita la comunicación entre servicios y mejora la estructura del entorno.