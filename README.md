# Docker-MongoDB

Simulador del back-end de una tienda online usando MongoDB ejecutado en contenedores Docker.

## Descripción
Este proyecto crea un entorno de bases de datos NoSQL con MongoDB mediante Docker Compose. Incluye scripts de inicialización, consultas CRUD y consultas avanzadas para simular el funcionamiento de un backend de e-commerce.

## Prerrequisitos
- Git
- Docker
- Docker Compose
- Un editor de código, como VS Code o GitHub Codespaces

## Estructura del proyecto
```bash
práctica-mongodb/
├── docker-compose.yml
├── mongo-init/
│   └── init.js
├── queries/
│   ├── crud.js
│   └── advanced.js
├── fecha/
├── README.md
└── practica.md
```

## Puesta en marcha
1. Clona el repositorio:
```bash
git clone <URL_DEL_REPOSITORIO>
cd práctica-mongodb
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
- Ver logs:
```bash
docker compose logs -f
```

- Entrar en el contenedor de MongoDB:
```bash
docker exec -it <nombre_contenedor> mongosh
```

- Detener el entorno:
```bash
docker compose down
```

## Volúmenes y redes
- El volumen `fecha/` se usa para persistir los datos de MongoDB.
- La red definida en Docker Compose permite que los contenedores se comuniquen usando nombres de servicio.

## Objetivo
El objetivo del proyecto es disponer de un entorno reproducible para practicar MongoDB con Docker y simular el backend de una tienda online.