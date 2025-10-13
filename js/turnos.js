
// Creamos array de turnos + validaciones

let turnos = JSON.parse(localStorage.getItem("turnos")) || []

function crearTurno(){
    return{
        nombre: document.getElementById("nombre").value.trim(),
        apellido: document.getElementById("apellido").value.trim(),
        dni: document.getElementById("dni").value.trim(),
        correo: document.getElementById("mail").value.trim(),
        celular: document.getElementById("celular").value.trim(),
        obrasocial: document.getElementById("botonobrasocial").innerText.trim(),
        fecha: document.getElementById("fecha").value.trim(),
        horario: document.getElementById("botonhorarios").innerText.trim(),   
    }
}

function validarTurno(turno){
    if(!turno.nombre) return "El nombre es obligatorio"
    if(!turno.apellido) return "El apellido es obligatorio"
    if(!turno.fecha) return "Selecciona una fecha"
    if(turno.dni.length != 8 || isNaN(turno.dni)) return "DNI debe contener 8 caracteres numericos" 
    if(turno.celular.length !=10 || isNaN(turno.celular)) return "Celular debe contener 10 caracteres numericos"
    if(turno.obrasocial  === "Selecciona una opción") return "Selecciona una obra social"
    if(turno.horario === "Selecciona una opción") return "Selecciona un horario"
    if(!turno.correo || !turno.correo.includes("@")) return "El correo no es válido"

    return true
}

// Funcion para poder seleccionar en el DROPDOWN

function configurarDropdown(botonID,menuID){
    const boton = document.getElementById(botonID)
    const menu = document.getElementById(menuID)
    const opciones = menu.querySelectorAll(".dropdown-item")

    opciones.forEach(opcion => {
        opcion.onclick=()=>{
            boton.innerText=opcion.innerText
        }
    })
    
}

configurarDropdown("botonobrasocial","menuobrasocial")
configurarDropdown("botonhorarios", "menuhorarios")

// Guardamos turnos en el array

let botonconfirmarturno = document.getElementById("confirmarturno")
let contenedorErrores = document.getElementById("errores")

botonconfirmarturno.onclick = () =>{
    const turno= crearTurno()

    const resultadoValidacion = validarTurno(turno)

    if(resultadoValidacion === true){
        turnos.push(turno)
        localStorage.setItem("turnos", JSON.stringify(turnos))

        window.location.href= "../index.html"

    }
    else{
        contenedorErrores.innerText = resultadoValidacion
    }
}



