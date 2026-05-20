// Base de datos
db = db.getSiblingDB('admin');
db.createUser({
  user: "david",
  pwd: "david97",
  roles: [{ role: "root", db: "admin" }]
});

print("✅ Usuario 'david' creado correctamente");

db = db.getSiblingDB('tienda');

print("✅ Base de datos 'tienda' seleccionada");

// Productos
db.productos.insertMany([
  {
    nombre: 'Portátil ultraligero',
    precio: 899.99,
    categoria: 'electrónica',
    stock: 15,
    valoracion: 4.8,
    activo: true,
    etiquetas: ['ordenador', 'trabajo', 'movilidad'],
    creado_lo: new Date()
  },
  {
    nombre: 'Auriculares inalámbricos',
    precio: 59.99,
    categoria: 'electrónica',
    stock: 40,
    valoracion: 4.4,
    activo: true,
    etiquetas: ['audio', 'bluetooth', 'gaming'],
    creado_lo: new Date()
  },
  {
    nombre: 'Monitor 27 pulgadas',
    precio: 229.99,
    categoria: 'electrónica',
    stock: 12,
    valoracion: 4.6,
    activo: true,
    etiquetas: ['pantalla', 'oficina'],
    creado_lo: new Date()
  },
  {
    nombre: 'Camiseta básica',
    precio: 12.95,
    categoria: 'ropa',
    stock: 100,
    valoracion: 4.1,
    activo: true,
    etiquetas: ['verano', 'casual'],
    creado_lo: new Date()
  },
  {
    nombre: 'Sudadera con capucha',
    precio: 29.95,
    categoria: 'ropa',
    stock: 60,
    valoracion: 4.5,
    activo: true,
    etiquetas: ['invierno', 'urbano'],
    creado_lo: new Date()
  },
  {
    nombre: 'Sofá 3 plazas',
    precio: 499.99,
    categoria: 'hogar',
    stock: 5,
    valoracion: 4.7,
    activo: true,
    etiquetas: ['salón', 'muebles'],
    creado_lo: new Date()
  },
  {
    nombre: 'Lámpara de escritorio',
    precio: 24.99,
    categoria: 'hogar',
    stock: 30,
    valoracion: 4.3,
    activo: true,
    etiquetas: ['iluminación', 'oficina'],
    creado_lo: new Date()
  },
  {
    nombre: 'Zapatillas running',
    precio: 74.99,
    categoria: 'deporte',
    stock: 25,
    valoracion: 4.6,
    activo: true,
    etiquetas: ['running', 'fitness'],
    creado_lo: new Date()
  },
  {
    nombre: 'Mancuernas ajustables',
    precio: 119.99,
    categoria: 'deporte',
    stock: 10,
    valoracion: 4.8,
    activo: true,
    etiquetas: ['gimnasio', 'fuerza'],
    creado_lo: new Date()
  },
  {
    nombre: 'Botella térmica',
    precio: 18.5,
    categoria: 'deporte',
    stock: 70,
    valoracion: 4.2,
    activo: true,
    etiquetas: ['hidratación', 'outdoor'],
    creado_lo: new Date()
  }
]);

// Clientes
db.clientes.insertMany([
  {
    nombre: 'Ana López',
    email: 'ana@example.com',
    telefono: '600111222',
    direccion: {
      calle: 'Carrer de Sants 120',
      ciudad: 'Barcelona',
      cp: '08028'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Carlos Pérez',
    email: 'carlos@example.com',
    telefono: '600333444',
    direccion: {
      calle: 'Avinguda Diagonal 45',
      ciudad: 'Barcelona',
      cp: '08019'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Laura García',
    email: 'laura@example.com',
    telefono: '600555666',
    direccion: {
      calle: 'Carrer Aragó 87',
      ciudad: 'Girona',
      cp: '17002'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Javier Ruiz',
    email: 'javier@example.com',
    telefono: '600777888',
    direccion: {
      calle: 'Carrer Major 10',
      ciudad: 'Tarragona',
      cp: '43001'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Marta Soler',
    email: 'marta@example.com',
    telefono: '600999000',
    direccion: {
      calle: 'Passeig de Gràcia 33',
      ciudad: 'Barcelona',
      cp: '08007'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'David Torres',
    email: 'david@example.com',
    telefono: '601111222',
    direccion: {
      calle: 'Carrer Mallorca 210',
      ciudad: 'Lleida',
      cp: '25005'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Elena Martín',
    email: 'elena@example.com',
    telefono: '601333444',
    direccion: {
      calle: 'Carrer Indústria 5',
      ciudad: 'Badalona',
      cp: '08912'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Sergio Navarro',
    email: 'sergio@example.com',
    telefono: '601555666',
    direccion: {
      calle: 'Carrer Nou 18',
      ciudad: 'Sabadell',
      cp: '08201'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Paula Vidal',
    email: 'paula@example.com',
    telefono: '601777888',
    direccion: {
      calle: 'Carrer Sant Pau 77',
      ciudad: 'Terrassa',
      cp: '08221'
    },
    registrado_el: new Date()
  },
  {
    nombre: 'Oriol Ferrer',
    email: 'oriol@example.com',
    telefono: '601999000',
    direccion: {
      calle: 'Carrer de la Riera 9',
      ciudad: 'Reus',
      cp: '43201'
    },
    registrado_el: new Date()
  }
]);

// Pedidos
db.pedidos.insertMany([
  {
    cliente_email: 'ana@example.com',
    fecha_pedido: new Date('2026-05-01'),
    estado: 'enviado',
    items: [
      { producto_nombre: 'Auriculares inalámbricos', cantidad: 1, precio_unitario: 59.99 },
      { producto_nombre: 'Botella térmica', cantidad: 2, precio_unitario: 18.5 }
    ],
    total: 96.99,
    metodo_pago: 'tarjeta'
  },
  {
    cliente_email: 'carlos@example.com',
    fecha_pedido: new Date('2026-05-02'),
    estado: 'procesando',
    items: [
      { producto_nombre: 'Portátil ultraligero', cantidad: 1, precio_unitario: 899.99 }
    ],
    total: 899.99,
    metodo_pago: 'paypal'
  },
  {
    cliente_email: 'laura@example.com',
    fecha_pedido: new Date('2026-05-03'),
    estado: 'entregado',
    items: [
      { producto_nombre: 'Camiseta básica', cantidad: 3, precio_unitario: 12.95 },
      { producto_nombre: 'Sudadera con capucha', cantidad: 1, precio_unitario: 29.95 }
    ],
    total: 68.8,
    metodo_pago: 'tarjeta'
  },
  {
    cliente_email: 'javier@example.com',
    fecha_pedido: new Date('2026-05-04'),
    estado: 'enviado',
    items: [
      { producto_nombre: 'Monitor 27 pulgadas', cantidad: 1, precio_unitario: 229.99 }
    ],
    total: 229.99,
    metodo_pago: 'transferencia'
  },
  {
    cliente_email: 'marta@example.com',
    fecha_pedido: new Date('2026-05-05'),
    estado: 'pendiente',
    items: [
      { producto_nombre: 'Sofá 3 plazas', cantidad: 1, precio_unitario: 499.99 }
    ],
    total: 499.99,
    metodo_pago: 'tarjeta'
  },
  {
    cliente_email: 'david@example.com',
    fecha_pedido: new Date('2026-05-06'),
    estado: 'entregado',
    items: [
      { producto_nombre: 'Mancuernas ajustables', cantidad: 1, precio_unitario: 119.99 },
      { producto_nombre: 'Zapatillas running', cantidad: 1, precio_unitario: 74.99 }
    ],
    total: 194.98,
    metodo_pago: 'paypal'
  },
  {
    cliente_email: 'elena@example.com',
    fecha_pedido: new Date('2026-05-07'),
    estado: 'procesando',
    items: [
      { producto_nombre: 'Lámpara de escritorio', cantidad: 2, precio_unitario: 24.99 }
    ],
    total: 49.98,
    metodo_pago: 'tarjeta'
  },
  {
    cliente_email: 'sergio@example.com',
    fecha_pedido: new Date('2026-05-08'),
    estado: 'cancelado',
    items: [
      { producto_nombre: 'Botella térmica', cantidad: 4, precio_unitario: 18.5 }
    ],
    total: 74.0,
    metodo_pago: 'tarjeta'
  },
  {
    cliente_email: 'paula@example.com',
    fecha_pedido: new Date('2026-05-09'),
    estado: 'enviado',
    items: [
      { producto_nombre: 'Auriculares inalámbricos', cantidad: 2, precio_unitario: 59.99 }
    ],
    total: 119.98,
    metodo_pago: 'paypal'
  },
  {
    cliente_email: 'oriol@example.com',
    fecha_pedido: new Date('2026-05-10'),
    estado: 'entregado',
    items: [
      { producto_nombre: 'Portátil ultraligero', cantidad: 1, precio_unitario: 899.99 },
      { producto_nombre: 'Lámpara de escritorio', cantidad: 1, precio_unitario: 24.99 }
    ],
    total: 924.98,
    metodo_pago: 'tarjeta'
  }
]);