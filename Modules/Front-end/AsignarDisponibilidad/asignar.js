const path = require('node:path')
const { Profesional } = require('../../../Modules/Back-end/Clases/Profesional.cjs')
const fs = require('node:fs')
const os = require('node:os')

const botonDisponibles = document.getElementById('botonDisponibles')
const botonVacaciones = document.getElementById('botonVacaciones')
const fechad = document.getElementsByClassName('fecha-desde')
const fechah = document.getElementsByClassName('fecha-hasta')

/*
const textoBotonDisponibles = botonDisponibles.querySelector('.texto')
const textoBotonVacaciones = botonVacaciones.querySelector('.texto')
const logoDisponibles = botonDisponibles.querySelector('.logo')
const logoVacaciones = botonVacaciones.querySelector('.logo')
*/

let aux = 1
const tablaDisponibles = document.querySelector('.Disponibles tbody') // Accedemos al cuerpo de la tabla "Disponibles"
const tablaVacaciones = document.querySelector('.Vacaciones tbody') // Accedemos al cuerpo de la tabla "Vacaciones"

// const database = [
//   { nombre: 'Julio Rodríguez', rut: '12345678-9' },
//   { nombre: 'Ana Pérez', rut: '98765432-1' },
//   { nombre: 'Juan Gómez', rut: '12345678-0' },
//   { nombre: 'Carla López', rut: '23456789-0' },
//   { nombre: 'Pedro Martínez', rut: '34567890-1' },
//   { nombre: 'Pedro Paul', rut: '34433222-k' }
//   // Puedes agregar más entradas aquí
// ]

const ruta = path.join(os.homedir(), 'Cesfam', 'Personal')
const database = []

const data = fs.readdirSync(ruta)
if (data.length !== 0) {
  data.forEach(xd => {
    const pro = new Profesional({ Rut: path.basename(xd, '.json'), Load: true, Dir: ruta })
    database.push({ nombre: `${pro.NombreProf} ${pro.ApellidoProf}`, rut: pro.RutProf })
    if (pro.vacaciones) {
      const nuevaFila = document.createElement('tr')
      nuevaFila.id = aux
      const inicio = `F${aux.toString()}`
      const final = `L${aux.toString()}`
      nuevaFila.innerHTML = `
            <td>${pro.NombreProf} ${pro.ApellidoProf}</td>
            <td>${pro.RutProf}</td>
            <td><input type="date" class="fecha-desde" id=${inicio}></td>
            <td><input type="date" class="fecha-hasta" id=${final}></td>
        `
      tablaVacaciones.appendChild(nuevaFila)
      aux += 1
    } else if ((!pro.vacaciones) && pro.vacaciones !== undefined) {
      const nuevaFila = document.createElement('tr')
      nuevaFila.innerHTML = `
            <td>${pro.NombreProf} ${pro.ApellidoProf}</td>
            <td>${pro.RutProf}</td>
        `
      tablaDisponibles.appendChild(nuevaFila) // Agregamos la fila a la tabla seleccionada
    }
  })
}

// Función para mostrar las sugerencias
function mostrarSugerencias (sugerencias) {
  const suggestionsList = document.getElementById('suggestionsList')
  suggestionsList.innerHTML = '' // Limpiar sugerencias anteriores
  if (sugerencias.length > 0) {
    sugerencias.forEach(item => {
      const li = document.createElement('li')
      li.textContent = `${item.nombre} - ${item.rut}`
      li.addEventListener('click', () => {
        document.getElementById('searchInput').value = item.nombre // Poner el nombre en el input
        suggestionsList.innerHTML = '' // Limpiar sugerencias
        suggestionsList.style.display = 'none' // Ocultar la lista de sugerencias
      })
      suggestionsList.appendChild(li)
    })
    suggestionsList.style.display = 'block' // Mostrar la lista de sugerencias
  } else {
    suggestionsList.style.display = 'none' // Ocultar la lista si no hay sugerencias
  }
}

// Función para buscar en la base de datos
function buscar () {
  const input = document.getElementById('searchInput')
  const query = input.value.toLowerCase()

  const resultados = database.filter(item =>
    item.nombre.toLowerCase().includes(query) || item.rut.includes(query)
  )

  mostrarSugerencias(resultados)
}

function estaPresente (seleccion) {
  let res1 = true
  let res2 = true
  // revisa el elemento Vacaciones
  let container = document.querySelectorAll('.Vacaciones tbody')
  container.forEach(elemento => {
    if (elemento.textContent.includes(seleccion.rut)) {
      res1 = false
    }
  })
  // revisa el elemento Disponibles
  container = document.querySelectorAll('.Disponibles tbody')
  container.forEach(elemento => {
    if (elemento.textContent.includes(seleccion.rut)) {
      res2 = false
    }
  })
  if (res1 && res2) {
    return true
  } else {
    return false
  }
}

// Función para manejar el evento de agregar a la tabla de Disponibles
botonDisponibles.addEventListener('click', function () {
  const searchInput = document.getElementById('searchInput').value
  const seleccion = database.find(item => item.nombre === searchInput)

  if (seleccion) {
    if (estaPresente(seleccion)) {
      const pro = new Profesional({ Rut: seleccion.rut, Load: true, Dir: ruta })
      pro.vacaciones = false
      pro.Guardar(ruta)
      const nuevaFila = document.createElement('tr')
      nuevaFila.innerHTML = `
            <td>${seleccion.nombre}</td>
            <td>${seleccion.rut}</td>
        `
      tablaDisponibles.appendChild(nuevaFila) // Agregamos la fila a la tabla seleccionada
    } else {
      globalThis.alert('Persona ya ingresada')
    }
  } else {
    globalThis.alert('Valor no encontrado')
  }
})

// Función para manejar el evento de agregar a la tabla de Vacaciones
botonVacaciones.addEventListener('click', function () {
  const searchInput = document.getElementById('searchInput').value
  const seleccion = database.find(item => item.nombre === searchInput)

  if (seleccion) {
    if (estaPresente(seleccion)) {
      const pro = new Profesional({ Rut: seleccion.rut, Load: true, Dir: ruta })
      pro.vacaciones = true
      pro.Guardar(ruta)
      const nuevaFila = document.createElement('tr')
      nuevaFila.id = aux
      const inicio = `F${aux.toString()}`
      const final = `L${aux.toString()}`
      nuevaFila.innerHTML = `
            <td>${seleccion.nombre}</td>
            <td>${seleccion.rut}</td>
            <td><input type="date" class="fecha-desde" id=${inicio}></td>
            <td><input type="date" class="fecha-hasta" id=${final}></td>
        `
      tablaVacaciones.appendChild(nuevaFila)
      aux += 1
    } else {
      globalThis.alert('Persona ya ingresada')
    }
  } else {
    globalThis.alert('Valor no encontrado')
  }
})

// Añadir evento al input de búsqueda
document.getElementById('searchInput').addEventListener('input', buscar)

// Ocultar las sugerencias al hacer clic fuera del input
document.addEventListener('click', (event) => {
  const suggestionsList = document.getElementById('suggestionsList')
  if (!event.target.closest('.input-box')) {
    suggestionsList.style.display = 'none' // Ocultar si se hace clic fuera
  }
})

document.addEventListener('click', (event) => {
  console.log(fechad[0].id)
})
