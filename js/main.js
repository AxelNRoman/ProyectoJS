class Producto {
    constructor(id, nombre, precio, stock, img, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.descripcion = descripcion;
    }
}

const compras = []
let productos = []
let carrito = [];
const precioCarrito = [];
const cartas = document.getElementById(`cartas`)
const contenidoCarrito = document.getElementById(`carrito`)
const total = document.getElementById(`totalAPagar`)
const btnPrecio = document.getElementById(`btnCarrito`)
const btnCompra = document.getElementById(`btnCompra`)
const btnCerrar = document.getElementById(`btnCerrar`)


obtenerProductos();
calcularPrecio();
lsCarrito();

function obtenerProductos() {
    const URLJSON = "js/productos.json"
    fetch(URLJSON)
        .then(res => res.json())
        .then(data => {
            productos = data
            cardsProductos()
        })
}

function lsCarrito() {
    if (localStorage.getItem(`carrito`)) {
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        calcularPrecio()
    }
}

function cardsProductos() {
    for (const producto of productos) {
        let carta = document.createElement(`div`);
        carta.className = `card`;
        carta.innerHTML = `<div class="" style="width: 18rem;">
             <img src="${producto.img}" class="card_img" alt="...">
           <div class="card-body">
             <h5 class="card_name">${producto.nombre}</h5>
             <p class="card_description">${producto.descripcion}</p>
             <div>
            <button id="agregarCarrito${producto.id}" type="button" class="card_button">Añadir</button>
            </div>
        </div>
    `;
        cartas.append(carta);
        const button = document.getElementById(`agregarCarrito${producto.id}`)
        button.addEventListener("click", (e) => {
            e.preventDefault()
            Swal.fire(
                `${producto.nombre}`,
                `Agregado al carrito`,
                `success`
            );
            carrito.push(producto)
            calcularPrecio();
            localStorage.setItem("carrito", JSON.stringify(carrito))
        })
    }
}

function calcularPrecio() {
    const precios = carrito.map(x => x.precio)
    precioCarrito.push = (precios)
    const { push } = precioCarrito
    const sumaPrecio = (...push) => {
        return push.reduce((acc, el) => acc + el, 0);
    }
    let montoTotal = sumaPrecio(...push)
    carrito.length == 0 ? total.innerHTML = `<p class="text_color" >¡Su carrito se encuentra vacío!</p>` : total.innerHTML = `<p class="text_color">Total a apagar $${montoTotal}</p>`
}

btnPrecio.addEventListener("click", contCarrito)
function contCarrito() {
    for (const producto of carrito) {
        let contCarrito = document.createElement(`div`);
        contCarrito.innerHTML = ` 
        <div class=cardCarrito>
        <img src="${producto.img}" class="cart_image" alt="productos">
        <div class="cart_cont">
        <h5 class="text_color d-flex justify-content-center align-items-center card-title">${producto.nombre}</h5>
        <div class="d-flex justify-content-around text_color align-items-center">
        <p class="card-text">$${producto.precio}</p>
                </div>
            </div>
            </div>
            <hr>
            `;
        contenidoCarrito.append(contCarrito);
    }
}

btnCerrar.addEventListener(`click`, function () {
    contenidoCarrito.innerHTML = ``;
})

btnCompra.addEventListener(`click`, function () {
    carrito.length !== 0 ?
        correct()
        :
        Swal.fire(
            `¡Aun no posee productos en su carrito!`,
            `Seleccione el prodcuto que desee y vuelva a intentarlo`,
            `error`
        );
})


function correct() {
    Swal.fire(
        `¡Su compra se ha realizado con exito!`,
        `No dude en volver a comprarnos`,
        `success`
    )
    compras.push(carrito)
    contenidoCarrito.innerHTML = ``;
    localStorage.setItem("Compra exitosa", JSON.stringify(compras[0]))
    carrito.length = 0;
    contCarrito();
    calcularPrecio();
    localStorage.removeItem("carrito", JSON.stringify(carrito))
}