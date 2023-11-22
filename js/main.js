let productos = [];

fetch('../js/productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    cargarProductos(productos);
  })
  .catch(error => console.error('Error al cargar los productos:', error));

  const contenedorProductos = document.querySelector("#contenedorProductos");
  const botonesCategorias = document.querySelectorAll(".botonCategoria");
  const tituloPrincipal = document.querySelector("#tituloPrincipal");
  
  let botonesAgregar = document.querySelectorAll(".productoAgregar");
  
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
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

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach((boton) => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter((producto) => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }
    })
});



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