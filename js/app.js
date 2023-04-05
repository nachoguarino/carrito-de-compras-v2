class ServicioController {
    constructor() {
        this.listaServicios = []
    }

    subirServicios() {
        let listaJSON = localStorage.getItem("listaServicios")

        if (listaJSON) {
            this.listaServicios = JSON.parse(listaJSON)
            return true
        }
        return false
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
        this.listaCarrito = [];
        (this.precio = document.getElementById("precio")),
        (this.precioIva = document.getElementById("precioIva"))
    
    }
    borrar(servicio){
        let indice = this.listaCarrito.indexOf(servicio)
        this.listaCarrito.splice(indice, 1)
    }
    subir() {
        let listaJSON = localStorage.getItem("listaCarrito")

        if (listaJSON) {
            this.listaCarrito = JSON.parse(listaJSON)
            return true
        }
        return false
    }
    añadirACarrito(servicio) {
        let Existe = this.listaCarrito.some((elemento) => elemento.id == servicio.id)
    
        if(Existe){
            const servicioEncontrado = this.buscar(servicio.id)
            servicioEncontrado.cantidad += 1
        }else{
            this.listaCarrito.push({...servicio, cantidad: 1})
        }
    
        let arrJSON = JSON.stringify(this.listaCarrito)
    
        localStorage.setItem("listaCarrito", arrJSON)
    }

    mostrarEnDom(nodo) {
        //limpiar container
        nodo.innerHTML = ""
        //muestro contenido
        this.listaCarrito.forEach((servicio) => {

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
                        <p class="card-text">cantidad: ${servicio.cantidad}</p>
                        <button id="borrar${servicio.id}" class="buttonTrash"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            `
            document.getElementById(`borrar${servicio.id}`).addEventListener("click", () =>{

                //borrar producto de this.listaServicios
                this.borrar(servicio)
                //actualiza storage
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                //actualiza DOM
                this.mostrarEnDom(servicios_carrito)
                this.mostrarPrecioDom()

            })
            document.getElementById(`borrar${servicio.id}`).addEventListener("click", () =>{
                
                this.borrar(servicio)
            })
        })
    }
    mostrarPrecioDom(){
        this.precio.innerHTML = "$" + this.calcularTotal()
        this.precioIva.innerHTML = "$" + this.calcularPrecioIva()
    }
    calcularTotal(){
        return this.listaCarrito.reduce( (acumulador, servicio) => acumulador + servicio.precio * servicio.cantidad , 0)
    }
    calcularPrecioIva(){
        const total = this.calcularTotal() * 1.21
        return Number(total.toFixed())
    }
    buscar(id){
        return this.listaCarrito.find((servicio) => servicio.id == id)
    }

    limpiar(){
        this.listaCarrito =[]
        localStorage.removeItem(this.listaCarrito)
        
        this.listaCarrito.forEach((servicio) =>{
            document.getElementById(`borrar${producto.id}`).addEventListener("click", () =>{

                this.borrar(servicio)
                //borrar producto de this.listaServicios
                localStorage.setItem("listaCarrito", JSON.stringify(this.listaCarrito))
                //actualiza DOM
                this.mostrarEnDom(servicios_carrito)
            })
        })
    }
}
//CONTROLADORES
const controladorServicios = new ServicioController()
const controladorCarrito = new CarritoController()

//VERIFICAR STORAGE
controladorServicios.subirServicios()
const levantoAlgo = controladorCarrito.subir()

//DOM
const servicios_container = document.getElementById("servicios_container")
const servicios_carrito = document.getElementById("servicios_carrito")
const precioMax = document.getElementById("filtroPrecio")
const ordenarPorPrecio = document.getElementById("ordenarPorPrecio")
const finalizarCompra = document.getElementById("finalizarCompra")
const vaciarCarrito = document.getElementById("vaciarCarrito")

if(levantoAlgo){
    controladorCarrito.mostrarPrecioDom(precio, precioIva)
}


//APP JS
controladorServicios.cargarEnDom(servicios_container)
controladorCarrito.mostrarEnDom(servicios_carrito)

//ORDENAR POR PRECIO
controladorServicios.ordenarPorPrecio()

//EVENTOS 

controladorServicios.listaServicios.forEach((servicio) => {
    const servicioAlCarrito = document.getElementById(`servicio${servicio.id}`)
    
    servicioAlCarrito.addEventListener("click", () => {
        controladorCarrito.subir(servicio)

        controladorCarrito.añadirACarrito(servicio)

        controladorCarrito.mostrarEnDom(servicios_carrito)
        controladorCarrito.mostrarPrecioDom(precio, precioIva)

        Toastify({
            text: "Servicio añadido con éxito",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            }).showToast();
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


finalizarCompra.addEventListener("click", () =>{
    if(controladorCarrito.listaCarrito.length >0){
        controladorCarrito.limpiar()
        controladorCarrito.mostrarEnDom(servicios_carrito)
        controladorCarrito.mostrarPrecioDom(precio,precioIva)

        swal(
                {position:"center",
                tittle:"Gracias por tu compra!",
                text:"Vuelva pronto",
                icon:"success",
                timer:2000
            });
    }else{
        swal(
                {position:"center",
                tittle:"Algo salió mal!",
                text:"El carrito no contiene servicios", 
                icon:"error",
                timer:2000});
    }
})

vaciarCarrito.addEventListener("click", () =>{
    controladorCarrito.limpiar()
    controladorCarrito.mostrarEnDom(servicios_carrito)
    controladorCarrito.mostrarPrecioDom()
})