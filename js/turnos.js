
// CARGAMOS EL LOCALSTORAGE DEL ARRAY, SI NO TIENE NADA GUARDADO SE CREA UN ARRAY VACIO

let turnos = JSON.parse(localStorage.getItem("turnos")) || []

// CARGAMOS EL ARCHIVO DATA.JSON

const URL = "../db/data.json"

function obtenerDataJSON (){
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                const menuObraSocial = document.getElementById("menuobrasocial")

                data.obrasSociales.forEach((os => {
                    
                    const li = document.createElement("li")
                    const a = document.createElement("a")

                    a.classList.add("dropdown-item")
                    a.innerText = os
                    a.onclick = () => {
                        document.getElementById("botonobrasocial").innerText = os
                    }

                    li.appendChild(a)
                    menuObraSocial.appendChild(li)
                }))

                const dropdownHorarios = document.getElementById("menuhorarios")

                data.horarios.forEach(h =>{

                    const li = document.createElement("li")
                    const a = document.createElement("a")

                    a.classList.add("dropdown-item")
                    a.innerText = h
                    a.onclick = () => {
                        document.getElementById("botonhorarios").innerText = h
                    }

                    li.appendChild(a)
                    dropdownHorarios.appendChild(li)
                })
            })

            .catch( () => {
                Swal.fire({
                    icon: "error",
                    title: "Error al cargar datos",
                    text: "No se pudo obtener la informacion, intente nuevamente.",

                })

            })
}




// FUNCION PARA CREAR EL TURNO

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

// FUNCION DE VALIDACION

function validarTurno(turno){
    if(!turno.nombre) return "El nombre es obligatorio"
    if(!turno.apellido) return "El apellido es obligatorio"
    if(turno.dni.length != 8 || isNaN(turno.dni)) return "DNI debe contener 8 caracteres numericos" 
    if(turno.celular.length !=10 || isNaN(turno.celular)) return "Celular debe contener 10 caracteres numericos"
    if(!turno.correo || !turno.correo.includes("@")) return "El correo no es válido"
    if(turno.obrasocial  === "Selecciona una opción") return "Selecciona una obra social"
    if(!turno.fecha) return "Selecciona una fecha"
    if(turno.horario === "Selecciona un horario") return "Selecciona un horario"

    return true
}

// FUNCION PARA SELECCIONAR EL DROPDOWN

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

// FUNCION PARA PODER RESERVAR UN TURNO POR DNI

function validarDNIunico(dni) {
    const turnoExistente = turnos.find(turno => turno.dni === dni)
    return !turnoExistente
}

// GUARDAMOS TURNOS EN EL LOCALSTORAGE

let botonconfirmarturno = document.getElementById("confirmarturno")
let contenedorErrores = document.getElementById("errores")

botonconfirmarturno.onclick = () =>{
    const turno= crearTurno()

    const resultadoValidacion = validarTurno(turno)

    if(resultadoValidacion === true){

        if (!validarDNIunico(turno.dni)) {
            contenedorErrores.innerText = "Ya existe un turno para este DNI"
            return
        }

        Swal.fire({
            title: "Desea confirmar el turno?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "SI",
            cancelButtonText: "CANCELAR",
            
        }).then((resultado => {
            if (resultado.isConfirmed){
                turnos.push(turno)
                localStorage.setItem("turnos", JSON.stringify(turnos))

                Swal.fire({
                    title: "Turno confirmado",
                    icon: "success",
                    draggable: true,
                }).then(()=>{
                    window.location.href = "../index.html"
                })
                
            }
            else if (resultado.isDismissed){

                Swal.fire({
                    icon: "error",
                    title: "Turno cancelado",
                }).then(()=>{
                    window.location.href = "../index.html"
                })
            }
        }))

        

    }
    else{
        contenedorErrores.innerText = resultadoValidacion
    }
}

// LE AGREGO SWEETALERT AL BOTON DE CANCELAR 

let botonCancelarVolverInicio = document.getElementById("volver-inicio")

botonCancelarVolverInicio.onclick = () => {
    Swal.fire({
        title: "Desea cancelar el turno?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "SI",
        cancelButtonText: "NO",
    }).then((resultado => {
        if(resultado.isConfirmed){
            Swal.fire({
                title: "Turno cancelado",
                text: "Volviendo a inicio...",
                showConfirmButton: false,  
                timer: 2000,            
            })

            setTimeout(()=>{
                window.location.href = "../index.html"
            }, 2000)
        }
    }))
}

// CALENDARIO

flatpickr("#fecha",{
        dateFormat: "d-m-Y",
        minDate: new Date(),
        disable:[
            function(date){
                return ![1,3,5].includes(date.getDay())
            }
        ],

        locale: {
            firstDayOfWeek: 0, 
            weekdays: { shorthand: ['Do','Lu','Ma','Mi','Ju','Vi','Sa'], longhand: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'] },
            months: { shorthand: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'], longhand: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'] }
        },


})


// OBTENGO LOS HORARIOS 

function obtenerTodosHorarios(){
    const items = document.querySelectorAll("#menuhorarios .dropdown-item")

    return [...items].map(items => items.innerText.trim())
}


// FILTRAMOS FECHA Y HORARI OS OCUPADOS

function actualizarHorariosDisponibles (fechaseleccionada){

    const horariostotales = obtenerTodosHorarios()
    const menu = document.getElementById("menuhorarios")

    // Aca filtramos los horarios ocupados

    const horarioOcupados = turnos
        .filter(turno => turno.fecha === fechaseleccionada)
        .map(turno=>turno.horario)

    // Aca filtramos los horarios disponibles

    const horariosDisponibles = horariostotales.filter(h=> !horarioOcupados.includes(h))

    //  Limpiamos el menu

    menu.innerHTML=""

    // Agregamos los disponibles

    horariosDisponibles.forEach(horario=>{
        const li = document.createElement("li")
        const a =document.createElement("a")
        a.classList.add("dropdown-item")
        a.innerText= horario
        a.onclick = ()=>{
            document.getElementById("botonhorarios").innerText = horario
        }

        li.appendChild(a)
        menu.appendChild(li)
    })

}

// Llamamos a la funcion

document.getElementById("fecha").addEventListener("change", (e) => {
    const fechaSeleccionada = e.target.value; // toma la fecha
    actualizarHorariosDisponibles(fechaSeleccionada);
})

obtenerDataJSON()