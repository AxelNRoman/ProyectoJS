class Productos {
    constructor(id, nombre, precio, stock, img, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.img = img;
        this.descripcion = descripcion;
    }
}

const productos = [
    {
        id: 1,
        nombre: "Forza5",
        precio: 3300,
        stock: 100,
        img: "./imgs/forza5.jpg",
        descripcion: "Maneja como nunca en el mundo de Forza Horizon, con una gran cantidad de vehiculos que te encantaran."
    },
    {
        id: 2,
        nombre: "CyberPunk77",
        precio: 5200,
        stock: 100,
        img: "./imgs/cyber77.jpg",
        descripcion: "Un futuro lleno de tecnologia avanzada y problemas te esperan."
    },
    {
        id: 3,
        nombre: "FIFA22",
        precio: 3600,
        stock: 100,
        img: "./imgs/fifa22.jpg",
        descripcion: "Conviertete en una estrella del futbol o el DT con más renombre, crea tu equipo, y más, en FIFA 22."
    },
    {
        id: 4,
        nombre: "STRAY",
        precio: 1900,
        stock: 100,
        img: "./imgs/stray.jpg",
        descripcion: "Vive la vida de un felino, en un mundo destruido lleno de robots y criaturas peligrosas."
    },
    {
        id: 5,
        nombre: "DAYZ",
        precio: 800,
        stock: 100,
        img: "./imgs/dayz.jpg",
        descripcion: "Un mundo lleno de zombies y otros jugadores que buscan sobrevivir."
    },
    {
        id: 6,
        nombre: "RDR2",
        precio: 1600,
        stock: 100,
        img: "./imgs/rdr2.jpg",
        descripcion: "Preparate para ser un forajido o cazarecompensas en el lejano oeste."
    },
]

const compras = []
let carrito = [];
const precioCarrito = [];
const cartas = document.getElementById(`cartas`)
const contenidoCarrito = document.getElementById(`carrito`)
const total = document.getElementById(`totalAPagar`)
const btnPrecio = document.getElementById(`btnCarrito`)
const btnCompra = document.getElementById(`btnCompra`)
const btnCerrar = document.getElementById(`btnCerrar`)



//Declaracion de funciones
calcularPrecio();
cardsProductos();
lsCarrito();

//Funcion LocalStorage
function lsCarrito() {
    if (localStorage.getItem(`carrito`)) {
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        calcularPrecio()
    }
}

//Funcion dibujo de cards
function cardsProductos() {
    for (const Productos of productos) {
        let carta = document.createElement(`div`);
        carta.className = `card`;
        carta.innerHTML = `<div class="" style="width: 18rem;">
             <img src="${Productos.img}" class="card_img" alt="...">
           <div class="card-body">
             <h5 class="card_name">${Productos.nombre}</h5>
             <p class="card_description">${Productos.descripcion}</p>
             <div>
            <button id="agregarCarrito${Productos.id}" type="button" class="card_button">Añadir</button>
            </div>
        </div>
    `;
        cartas.append(carta);
        const button = document.getElementById(`agregarCarrito${Productos.id}`)
        button.addEventListener("click", (e) => {
            e.preventDefault()
            Swal.fire(
                `${Productos.nombre}`,
                `Agregado al carrito`,
                `success`
            );
            carrito.push(Productos)
            calcularPrecio();
            localStorage.setItem("carrito", JSON.stringify(carrito))
        })
    }
}

//funcion precio carrito
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

//Evento boton carrito
btnPrecio.addEventListener("click", contCarrito)
function contCarrito() {
    for (const Productos of carrito) {
        let contCarrito = document.createElement(`div`);
        contCarrito.innerHTML = ` 
        <div class=cardCarrito>
        <img src="${Productos.img}" class="cart_image" alt="productos">
        <div class="cart_cont">
        <h5 class="text_color d-flex justify-content-center align-items-center card-title">${Productos.nombre}</h5>
        <div class="d-flex justify-content-around text_color align-items-center">
        <p class="card-text">$${Productos.precio}</p>
                </div>
            </div>
            </div>
            <hr>
            `;
        contenidoCarrito.append(contCarrito);
    }
}

//Redibujar de 0 carrito
btnCerrar.addEventListener(`click`, function () {
    contenidoCarrito.innerHTML = ``;
})

//Ternario para habilitar compra.
btnCompra.addEventListener(`click`, function () {
    carrito.length !== 0 ?
        //Si el carrito tiene productos y se presiona comprar.
        correct()
        :
        //Si el carrito no posee productos y se presiona comprar. 
        Swal.fire(
            `¡Aun no posee productos en su carrito!`,
            `Seleccione el prodcuto que desee y vuelva a intentarlo`,
            `error`
        );
})

//SweatAlert para la compra realizada.
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