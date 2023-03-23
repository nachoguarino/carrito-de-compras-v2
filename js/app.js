class ServicioController {
    constructor() {
        this.listaServicios = []
    }

    subirServicios() {
        let listaJSON = localStorage.getItem("listaServicios")

        if (listaJSON) {
            this.listaServicios = JSON.parse(listaJSON)
        }
    }
    filtrarPrecioMax(precio) {
        this.listaServicios = this.listaServicios.filter(servicio => servicio.precio <= precio)
    }
    ordenarPorPrecio() {
        this.listaServicios.sort((a, b) => a.precio - b.precio);
    }
    cargarEnDom(nodo) {
        this.listaServicios.forEach(servicio => {
            nodo.innerHTML += `<div class="card" style="width: 18rem;">
            <img src="https://yt3.googleusercontent.com/ytc/AL5GRJVyaKyzr5lmzcEMoErT8EGUChYsjfN0iAF-Lnvx=s900-c-k-c0x00ffffff-no-rj" class="card-img-top" alt="imagen-servicio">
            <div class="card-body">
                <h5 class="card-title">${servicio.servicio}</h5>
                <p class="card-text">${servicio.descripcion}</p>
                <h3 class="card-text">$${servicio.precio}</h3>
                
                <a href="#" class="btn btn-primary" id="servicio${servicio.id}">Agregar al Carrito</a>
            </div>
        </div>`
        })
    }
    limpiarDom(nodo) {
        nodo.innerHTML = ""

    }
}

class CarritoController {
    constructor() {
        this.listaCarrito = []

    }
    subir() {
        let listaJSON = localStorage.getItem("listaCarrito")

        if (listaJSON) {
            this.listaCarrito = JSON.parse(listaJSON)
        }
    }
    añadirACarrito(servicio) {
        this.listaCarrito.push(servicio)
        let arrJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", arrJSON)
    }

    mostrarEnDom(nodo) {

        nodo.innerHTML = ""

        this.listaCarrito.forEach(servicio => {

            nodo.innerHTML += `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="https://yt3.googleusercontent.com/ytc/AL5GRJVyaKyzr5lmzcEMoErT8EGUChYsjfN0iAF-Lnvx=s900-c-k-c0x00ffffff-no-rj" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${servicio.servicio}</h5>
                        <p class="card-text">${servicio.descripcion}</p>
                        <h3 class="card-text">$${servicio.precio}</h3>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
    }
}


//DOM
const servicios_container = document.getElementById("servicios_container")
const servicios_carrito = document.getElementById("servicios_carrito")
const precioMax = document.getElementById("filtroPrecio")
const ordenarPorPrecio = document.getElementById("ordenarPorPrecio")

//CONTROLADORES
const controladorServicios = new ServicioController()
const controladorCarrito = new CarritoController()

//INICIAR
controladorServicios.subirServicios()
controladorCarrito.subir()

//ORDENAR POR PRECIO
controladorServicios.ordenarPorPrecio()

//CARGAR EN DOM
controladorServicios.cargarEnDom(servicios_container)



//AÑADIR AL CARRITO 

controladorServicios.listaServicios.forEach(servicio => {

    const servicioAlCarrito = document.getElementById(`servicio${servicio.id}`)
    
    servicioAlCarrito.addEventListener("click", () => {
        
        controladorCarrito.subir(servicio)
        controladorCarrito.añadirACarrito(servicio)
        controladorCarrito.mostrarEnDom(servicios_carrito)
    })
})

//FILTRO
precioMax.addEventListener("change", () => {
    if (precioMax.value > 0) {
        controladorServicios.subirServicios()
        controladorServicios.filtrarPrecioMax(precioMax.value)
        controladorServicios.ordenarPorPrecio() // ordenar por precio luego de filtrar
        controladorServicios.limpiarDom(servicios_container)
        controladorServicios.cargarEnDom(servicios_container)
    } else {
        controladorServicios.subirServicios()
        controladorServicios.ordenarPorPrecio() // ordenar por precio si no hay filtro
        controladorServicios.limpiarDom(servicios_container)
        controladorServicios.cargarEnDom(servicios_container)
    }
})


ordenarPorPrecio.addEventListener("click", () => {
    controladorServicios.ordenarPorPrecio()
    controladorServicios.limpiarDom(servicios_container)
    controladorServicios.cargarEnDom(servicios_container)
})
//CARRITO IMPLEMENTANDOSE AUN
