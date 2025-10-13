

let turnos = JSON.parse(localStorage.getItem("turnos")) || []

let contenedorturnos = document.getElementById("listaTurnos")


if(turnos.length === 0){
    contenedorturnos.innerText = "Ingrese un DNI para ver sus turnos"
}
else{

}

// CARD DE TURNOS

function cardTurnos(turnos){
    turnos.forEach((dato, index) =>{
        const card = document.createElement("div")
        card.innerHTML=`<h3> ${dato.nombre.toUpperCase()} ${dato.apellido.toUpperCase()} </h3>
                        <h4> DNI: ${dato.dni} </h4>
                        <h4> Fecha: ${dato.fecha} </h4>
                        <h4> Horario: ${dato.horario} </h4>
                        <button class="boton-cancelar" data-index= ${index} > Cancelar turno </button>
                        `
        contenedorturnos.appendChild(card)
    })
}



// Boton para cancelar cancelar un turno
function cancelarturno(){
    let botonescancelar = document.querySelectorAll(".boton-cancelar")

    botonescancelar.forEach(boton=>{
        boton.onclick=()=>{
            const index = boton.getAttribute("data-index")
            turnos.splice(index, 1)
            localStorage.setItem("turnos", JSON.stringify(turnos))
            location.reload()
        }
    })
}

// Filtrado de turnos por DNI

let inputBuscar = document.getElementById("buscarDNI")
let botonbuscarturno = document.getElementById("botonfiltradodni")


botonbuscarturno.onclick =() => {
    const dnibuscado = inputBuscar.value.trim()

    if (dnibuscado === ""){
        contenedorturnos.innerHTML = ` <p> Ingrese su DNI para ver turnos </p>`
        return
    }

    const turnosfiltrados = turnos.filter( turno => turno.dni.includes(dnibuscado))

    contenedorturnos.innerHTML = ""

    if (turnosfiltrados.length === 0){
        contenedorturnos.innerHTML = `<p> No hay turnos registrados </p>`
    }

    else{
        cardTurnos(turnosfiltrados)
        cancelarturno()
    }
}

