const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const rutaArchivoProductos = 'productos.json';

// Función para enviar actualizaciones de stock
function enviarActualizacionStock() {
  const productos = obtenerProductosDesdeJSON();
  io.emit('actualizarStock', productos);
}

// Función para obtener la información actual de los productos desde el archivo JSON
function obtenerProductosDesdeJSON() {
  try {
    const contenidoArchivo = fs.readFileSync(rutaArchivoProductos, 'utf-8');
    return JSON.parse(contenidoArchivo);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    return [];
  }
}

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Enviar la información inicial
  enviarActualizacionStock();

  // Manejar eventos de actualización de stock
  socket.on('actualizarStock', (nuevoStock) => {
    // Actualizar el stock en el archivo JSON
    fs.writeFileSync(rutaArchivoProductos, JSON.stringify(nuevoStock, null, 2), 'utf-8');
    
    // Enviar actualización a todos los clientes conectados
    enviarActualizacionStock();
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
