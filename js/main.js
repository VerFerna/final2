const contenedorProductos = document.querySelector("#contenedorProductos");
const tituloPrincipal = document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".productoAgregar");
const socket = io();

const productos = [
    {
        id: "Aceite Limpiador",
        titulo: "Jojoba & Rosehip Cleanser Oil Blend",
        imagen: "..//img/jojoba-rosehip-cleanser-oil-blend.png",
        descripcion: "Aceite limpiador desmaquillante. Permite una suave y eficaz higiene de suciedad, impurezas y maquillaje, protegiendo la integridad de la piel sin generar irritación.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Crema Correctora",
        titulo: "Jojoba & Rosehip Facial Cream",
        imagen: "..//img/jojoba-rosehip-facial-cream.png",
        descripcion: "Crema correctora de los signos marcados de la edad. Reparación profunda enfocada en las arrugas y perdida de firmeza.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Exfoliante",
        titulo: "Jojoba & Rosehip Lip Scrub",
        imagen: "..//img/jojoba-rosehip-lips.png",
        descripcion: "Exfoliante para suavizar la superficie de los labios resecos y agrietados.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Balsamo labial",
        titulo: "Jojoba & Rosehip Lip Balm",
        imagen: "..//img/jojoba-rosehip-lips-2.png",
        descripcion: "Bálsamo labial hidratante y voluminizador. Repara y suaviza los labios resecos y agrietados.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Limpiador",
        titulo: "Yerba Mate & Orange Jelly Cleanser",
        imagen: "..//img/yerba-mate-orange-jelly-cleanser.png",
        descripcion: "Limpia profundamente respetando la integridad de la piel. Remueve impurezas y maquillaje. Con pH equilibrado y propiedades hidratantes que evitan que la piel quede tirante.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Crema Renovadora",
        titulo: "Uva Malbec Facial Cream",
        imagen: "..//img/uva-malbec-facial-cream.png",
        descripcion: "Crema renovadora y regeneradora profunda que combate los signos del envejecimiento como arrugas, manchas y flaccidez.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Suero Ultraconcentrado",
        titulo: "Uva Malbec Serum",
        imagen: "..//img/uva-malbec-serum.png",
        descripcion: "Suero ultraconcentrado para una regeneración profunda de la piel. Previene y corrige los signos del envejecimiento como arrugas, manchas y flaccidez.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Emulsión de Limpieza",
        titulo: "Malva & Hibiscus Cleanser Emulsion",
        imagen: "..//img/malva-hibiscus-cleanser-emulsion.png",
        descripcion: "Emulsión de limpieza botánica. Remueve suciedad, impurezas y maquillaje de la superficie, respetando la integridad de la piel. No genera irritación ni tirantez. Ideal para la pieles sensibles o delicadas.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Emulsión Facial",
        titulo: "Calafate & Maqui Facial Emulsion",
        imagen: "..//img/calafate-maqui-facial-emulsion.png",
        descripcion: "Bruma antioxidante y bioprotectora. Revitaliza la piel devolviéndole su luminosidad natural. Hidrata y tonifica brindando frescura y protección antioxidante.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Bruma antioxidante",
        titulo: "Calafate & Maqui Antioxidant",
        imagen: "..//img/calafate-maqui-brume.png",
        descripcion: "Revitaliza la piel y le devuelve su luminosidad natural. Unifica el tono de la piel, brinda suavidad e hidratación, mientras protege de la oxidación y el estrés ambiental.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Emulsión Facial",
        titulo: "Calafate & Maqui Facial Emulsion",
        imagen: "..//img/calafate-maqui-facial-emulsion.png",
        descripcion: "Revitaliza la piel y le devuelve su luminosidad natural. Unifica el tono de la piel, brinda suavidad e hidratación, mientras protege de la oxidación y el estrés ambiental.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Loción revitalizante",
        titulo: "Vitamin C All-Day Radiance Lotion",
        imagen: "..//img/vitamin-c-all-day-radiance-lotion.png",
        descripcion: "Loción revitalizante y bioestimulante. Luminosidad y frescura para tu piel. Con Vitamina C, Ginseng y Maca.",
        stock: 8,
        precio: 5335,
    },
    {
        id: "Limpia Impurezas",
        titulo: "Vitamin C Cleanser",
        imagen: "..//img/Vitamin-C-Cleanser.png",
        descripcion: "Limpia impurezas del cuerpo y rostro. No irrita ni agrede la piel. Libre de parabenos y aceites minerales.",
        stock: 8,
        precio: 5335,
    },
];

function cargarProductos(productosElegidos) {
    //contenedorProductos.innerHTML
    contenedorProductos.innerHTML = "";
    //forEach de los productos elegidos
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="container-fluid mt-2">
        <div class="row justify-content-center">
          <div class="card mb-3" style="max-width: 500px;">
            <div class="row g-0">
              <div class="col-md-4">
                <img src="${producto.imagen}" class="img-fluid rounded-start imgEfecto" alt="${producto.id}" />
              </div>
              <div class="col-md-8">
                <div class="card-body align-items-center card-title text-center"> ${producto.titulo}
                  <div class="card-text list-group-item"> ${producto.descripcion}
                    <div class="card-text list-group-item"> Precio: $ ${producto.precio}
                      <div class="card-text list-group-item"> Stock: ${producto.stock}
                        <div>
                          <button class="productoAgregar btn colorBtn" id="${producto.id}" type="submit">Agregar al carrito</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}


cargarProductos(productos);


function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".productoAgregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }
}


// Cuando necesitas actualizar el stock para un producto específico, emite un evento al servidor
function actualizarStockEnTiempoReal(productoActualizado) {
  socket.emit('actualizarStock', productoActualizado);
}

// Manejar actualizaciones de stock desde el servidor
socket.on('actualizarStock', (productosActualizados) => {
  // Actualizar la interfaz de usuario con los productos actualizados
  cargarProductos(productosActualizados);
});

// Supongamos que tienes una función cargarProductos que actualiza la interfaz de usuario
function cargarProductos(productos) {
  // Implementa la lógica para actualizar la interfaz de usuario con los productos proporcionados
  console.log('Productos actualizados:', productos);
}
