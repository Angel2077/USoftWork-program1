const path = require('path')
const fs = require('fs')
const os = require('os')
const { Profesional } = require('../../Back-end/Clases/Profesional.cjs')

/*
const botonVacaciones = document.getElementById('botonVacaciones')
const textoBotonDisponibles = botonDisponibles.querySelector('.texto')
const textoBotonVacaciones = botonVacaciones.querySelector('.texto')
const logoDisponibles = botonDisponibles.querySelector('.logo')
const logoVacaciones = botonVacaciones.querySelector('.logo')
const tablaVacaciones = document.querySelector('.Vacaciones tbody')// Accedemos al cuerpo de la tabla "Vacaciones"
*/

const botonDisponibles = document.getElementById('botonDisponibles')
const tablaDisponibles = document.querySelector('.Disponibles tbody') // Accedemos al cuerpo de la tabla "Disponibles"

/*
const database = [
  { nombre: 'Julio Rodríguez', rut: '12345678-9' },
  { nombre: 'Ana Pérez', rut: '98765432-1' },
  { nombre: 'Juan Gómez', rut: '12345678-0' },
  { nombre: 'Carla López', rut: '23456789-0' },
  { nombre: 'Pedro Martínez', rut: '34567890-1' },
  { nombre: 'Pedro Paul', rut: '34433222-k' }
  // Puedes agregar más entradas aquí
]
*/
const ruta = path.join(os.homedir(), 'Cesfam', 'Personal')
const database = []

const data = fs.readdirSync(ruta)
if (data.length !== 0) {
  data.forEach(xd => {
    const pro = new Profesional({ Rut: path.basename(xd, '.json'), Load: true, Dir: ruta })
    database.push({ nombre: pro.NombreProf, rut: pro.RutProf })
  })
}

// Función para manejar el evento de agregar a la tabla de Disponibles
botonDisponibles.addEventListener('click', function () {
  manejarAgregar(tablaDisponibles)
})

// Función común para agregar a la tabla de Disponibles
function manejarAgregar (tabla) {
  const searchInput = document.getElementById('searchInput').value
  const seleccion = database.find(item => item.nombre === searchInput)

  if (seleccion) {
    const nuevaFila = document.createElement('tr')
    nuevaFila.innerHTML = `
            <td>${seleccion.nombre}</td>
            <td>${seleccion.rut}</td>
        `
    tabla.appendChild(nuevaFila) // Agregamos la fila a la tabla seleccionada
  }
}

// Función para mostrar las sugerencias
function mostrarSugerencias (sugerencias) {
  const suggestionsList = document.getElementById('suggestionsList')
  suggestionsList.innerHTML = '' // Limpiar sugerencias anteriores
  if (sugerencias.length > 0) {
    sugerencias.forEach(item => {
      const li = document.createElement('li')
      // eslint-disable-next-line semi
      li.textContent = `${item.nombre} - ${item.rut}`;
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

// Añadir evento al input de búsqueda
document.getElementById('searchInput').addEventListener('input', buscar)

// Ocultar las sugerencias al hacer clic fuera del input
document.addEventListener('click', (event) => {
  const suggestionsList = document.getElementById('suggestionsList')
  if (!event.target.closest('.input-box')) {
    suggestionsList.style.display = 'none' // Ocultar si se hace clic fuera
  }
})

/*
// Función para manejar la adición a la tabla de Vacaciones
function manejarAgregarVacaciones () {
  const searchInput = document.getElementById('searchInput').value
  const seleccion = database.find(item => item.nombre === searchInput)

  if (seleccion) {
    const nuevaFila = document.createElement('tr')
    nuevaFila.innerHTML = `
            <td>${seleccion.nombre}</td>
            <td>${seleccion.rut}</td>
            <td><input type="date" class="fecha-desde"></td>
            <td><input type="date" class="fecha-hasta"></td>
        `
    tablaVacaciones.appendChild(nuevaFila)
  }
}

// Función para manejar el evento de agregar a la tabla de Vacaciones
botonVacaciones.addEventListener('click', function () {
  manejarAgregarVacaciones()
})

*/
