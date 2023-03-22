let listaServicios;
let obtenerJSON = localStorage.getItem("listaServicios")

if (obtenerJSON) {
    listaServicios = JSON.parse(obtenerJSON)
    
} else {
    listaServicios = []
}

const form = document.getElementById("cargarServicios")

form.addEventListener("submit", (e) =>{

    e.preventDefault()

    const id = document.getElementById("id").value
    const servicio = document.getElementById("servicio").value
    const precio = document.getElementById("precio").value
    const descripcion = document.getElementById("descripcion").value

    listaServicios.push({id:id,servicio:servicio,precio:precio,descripcion:descripcion})
    
    const listaServiciosJSON = JSON.stringify(listaServicios)
    
    localStorage.setItem("listaServicios", listaServiciosJSON)

    form.reset()

})