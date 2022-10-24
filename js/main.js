function Producto(nombre, precio, stock){
    this.nombre = nombre
    this.precio = precio
    this.stock = stock
}

const productoA = new Producto("RDR2", 1600, 1000)
const productoB = new Producto("Forza5", 3300, 1000)
const productoC = new Producto("Cyberpunk77", 5200, 1000)
const productoD = new Producto("FIFA22", 3600, 1000)
const productoE = new Producto("STRAY", 1900, 1000)
const productoF = new Producto("DAYZ", 800, 1000)

let listaProductos = [productoA, productoB, productoC, productoD, productoE, productoF]

let nombresProductos = []


function listado(){
    for(const producto of listaProductos){
        nombresProductos.push(producto.nombre)
    }
}
listado()

console.log(nombresProductos)

let cantidadCompras = prompt("Este es nuestro catálogo, elegí la/las cantidad/es de diferentes juegos que quieras comprar y preparate para viciar: \n "  + nombresProductos.join("\n "))
let precioTotal = 0;


function calculoPrecio(cantidad, precio){
    precioTotal += cantidad * precio
}

function calculoStock(cantidad, stock, precio){
    if(stock >= cantidad){
        calculoPrecio(cantidad, precio)
        console.log("El precio total es de: $" + (cantidad * precio))
    }
    else{
        alert("No disponemos de esa cantidad en stock. Nuestro stock actual es de: " + stock + " unidades")
    }
}

function sumarIva(precio){
    return precio * 1.21
}


for(let i = 0; i < cantidadCompras; i++){

    let compra1 = prompt("Ingrese el nombre del juego que queres comprar: \n " + nombresProductos.join("\n ")).toLowerCase()
    let cantidad1 = prompt("Ingresa la cantidad de copias que queres comprar:")

    if(compra1 === productoA.nombre.toLowerCase()){
        calculoStock(cantidad1, productoA.stock, productoA.precio)
    }
    else if(compra1 ===  productoB.nombre.toLowerCase()){
        calculoStock(cantidad1, productoB.stock, productoB.precio)
    }
    else if(compra1 ===  productoC.nombre.toLowerCase()){
        calculoStock(cantidad1, productoC.stock, productoC.precio)
    }
    else if(compra1 ===  productoD.nombre.toLowerCase()){
        calculoStock(cantidad1, productoD.stock, productoD.precio)
    }
    else if(compra1 ===  productoE.nombre.toLowerCase()){
        calculoStock(cantidad1, productoD.stock, productoD.precio)
    }
    else if(compra1 ===  productoF.nombre.toLowerCase()){
        calculoStock(cantidad1, productoD.stock, productoD.precio)
    }
    else{
        alert("No contamos con ese juegazo")
    }
}

let precioToTalConImpuestos = sumarIva(precioTotal)

alert("Precio final con los malditos impuestos: $" + precioToTalConImpuestos)


