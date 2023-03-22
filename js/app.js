class ServicioController {
    constructor() {
        this.listaServicios = []
    }

    subirServicios() {
        let listaJSON = localStorage.getItem("listaServicios")

        if (listaJSON) {
            this.listaServicios = JSON.parse(listaJSON)
        } else {
            this.listaServicios = []
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
                
                <a href="#" class="btn btn-primary" id="agregarAlCarrito">Agregar al Carrito</a>
            </div>
        </div>`
        })
    }
    limpiarDom(nodo) {
        nodo.innerHTML = ""

    }
}
//DOM
const servicios_container = document.getElementById("servicios_container")
const precioMax = document.getElementById("filtroPrecio")
const ordenarPorPrecio = document.getElementById("ordenarPorPrecio")

//APP
const controladorServicios = new ServicioController()
controladorServicios.subirServicios()
controladorServicios.ordenarPorPrecio() // ordenar por precio por defecto
controladorServicios.cargarEnDom(servicios_container)

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

//ORDENAR POR PRECIO
ordenarPorPrecio.addEventListener("click", () => {
    controladorServicios.ordenarPorPrecio()
    controladorServicios.limpiarDom(servicios_container)
    controladorServicios.cargarEnDom(servicios_container)
})
