# Docker-MongoDB

Simulador del back-end de una tienda online usando MongoDB ejecutado en contenedores Docker.

## Descripción
Este proyecto crea un entorno de bases de datos NoSQL con MongoDB mediante Docker Compose. Incluye scripts de inicialización, consultas CRUD y consultas avanzadas para simular el funcionamiento de un backend de e-commerce.

## 📋 Prerrequisitos

| Software           | Versión mínima | Instalación  |
|----------          |----------------|--------------|
| **Docker**         |     24.0.0+    | [docker.com](https://docs.docker.com/get-docker/) |
| **Docker Compose** |     2.20.0+    | Incluido con Docker Desktop |
| **Git** (opcional) |     2.30.0+    | [git-scm.com](https://git-scm.com/) |

- Un editor de código, como VS Code o GitHub Codespaces

## Estructura del proyecto
```bash
Docker-MongoDB/
├── docker-compose.yml
├── queries/
│   ├── CRUD.js
│   └── advanced.js
├── mongo-init/
│   └── init.js
├── fecha/                     # Se crea automáticamente
└── .env                       
```

### Explicacion de archivos 

docker-compose.yml	        Define los servicios (MongoDB + Mongo Express), redes y volúmenes
queries/CRUD.js	            Operaciones CRUD básicas (opciones 1-13)
queries/advanced.js	        Consultas avanzadas y gestión de índices (opciones 14-25)
mongo-init/init.js	        Script de inicialización: crea usuario david y datos de ejemplo
fecha/	                    Volumen named para persistencia de datos MongoDB


## Guia e ejecucion rapida 📊

1. Clona el repositorio:
```bash
git clone https://github.com/DrMack97/Docker-MonGoDB.git
cd Docker-MonGoDB
```

2. Levanta el entorno:
```bash
docker compose up -d
```

3. Comprueba que los contenedores están activos:
```bash
docker ps
```

## Comandos útiles
- Ver  logs:      logs = (bitacora)
```bash
docker compose logs  -f
```

- Entrar en el contenedor de MongoDB:
```bash
docker exec -it <mongodb-tienda> mongosh
```

- Detener el entorno:
```bash
docker compose down
```

# Después de modificar CRUD.js
```bash
docker cp ./queries/CRUD.js mongodb-tienda:/tmp/CRUD.js
```

# Después de modificar advanced.js
```bash
docker cp ./queries/advanced.js mongodb-tienda:/tmp/advanced.js
```

# Ejecutar el CRUD principal
```bash
docker exec -it mongodb-tienda mongosh -u david -p david97 --authenticationDatabase admin --eval 'load("/tmp/CRUD.js")'
```


## Volúmenes y redes
- El volumen `fecha/` se usa para persistir los datos de MongoDB.
- La red definida en Docker Compose permite que los contenedores se comuniquen usando nombres de servicio.

## Objetivo
El objetivo del proyecto es disponer de un entorno reproducible para practicar MongoDB con Docker y simular el backend de una tienda online.