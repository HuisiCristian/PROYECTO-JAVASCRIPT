// CARGAMOS EL LOCALSTORAGE DEL ARRAY, SI NO TIENE NADA GUARDADO SE CREA UN ARRAY VACIO

let turnos = JSON.parse(localStorage.getItem("turnos")) || []

let contenedorturnos = document.getElementById("listaTurnos")

// CARD DE TURNOS

function cardTurnos(turnos){
    turnos.forEach((dato, index) =>{
        const card = document.createElement("div")
        card.classList.add("card-turno")
        card.innerHTML=`<h3> ${dato.nombre.toUpperCase()} ${dato.apellido.toUpperCase()} </h3>
                        <h4> DNI: ${dato.dni} </h4>
                        <h4> Fecha: ${dato.fecha} </h4>
                        <h4> Horario: ${dato.horario} </h4>
                        <button class="boton-cancelar" data-index= ${index} > Cancelar turno </button>
                        `
        contenedorturnos.appendChild(card)
    })
}



// BOTON DE CANCELACION (ELIMINA TURNOS)
function cancelarturno(){
    let botonescancelar = document.querySelectorAll(".boton-cancelar")

    botonescancelar.forEach(boton=>{
        boton.onclick=()=>{
            const index = boton.getAttribute("data-index")

            Swal.fire({
                title: "Desea cancelar su turno?",
                icon: "warning",
                confirmButtonText: "SI",
                showCancelButton: true,
                cancelButtonText: "NO",

            }).then((resultado =>{
                if(resultado.isConfirmed){
                    turnos.splice(index, 1)
                    localStorage.setItem("turnos", JSON.stringify(turnos))
                    
                    Swal.fire({
                        title:"Su turno ha sido cancelado correctamente",
                        icon: "success",
                    }).then(()=>{
                        location.reload()
                    })
                    
                }
            }))
            
        }
    })
}


// FILTRADO DE TURNOS POR DNI

let inputBuscar = document.getElementById("buscarDNI")
let botonbuscarturno = document.getElementById("botonfiltradodni")


botonbuscarturno.onclick =() => {
    const dnibuscado = inputBuscar.value.trim()

    if (dnibuscado === ""){
        contenedorturnos.innerHTML = ` <p> Ingrese su DNI para ver turnos </p>`
        return
    }

    const turnosfiltrados = turnos.filter( turno => turno.dni === (dnibuscado.trim()))

    contenedorturnos.innerHTML = ""

    if (turnosfiltrados.length === 0){
        contenedorturnos.innerHTML = `<p> No hay turnos registrados </p>`
    }

    else{
        cardTurnos(turnosfiltrados)
        cancelarturno()
    }
}

