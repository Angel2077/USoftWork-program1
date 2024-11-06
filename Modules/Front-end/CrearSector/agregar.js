/* eslint-disable no-undef */
const boton = document.getElementById('boton')
const texto = document.querySelector('.texto')
const logo = document.querySelector('.logo')
const input = document.querySelector('.input-box input')
const colorItems = document.querySelectorAll('.color-item')

// Funcionalidad de cambiar el texto del botón y la opacidad del logo
function agregarCaja () {
  boton.classList.toggle('active')

  if (boton.classList.contains('active')) {
    texto.textContent = 'OK'
    logo.style.opacity = 0
  } else {
    texto.textContent = 'Guardar'
    logo.style.opacity = 1
  }

  const nombre = input.value // Obtener el nombre
  const colorSeleccionado = document.querySelector('.color-item.selected').getAttribute('data-color') // Obtener el color seleccionado

  if (nombre && colorSeleccionado) {
    // Verificar si el nombre ya existe
    const nombresExistentes = document.querySelectorAll('.background-container .sector')
    const nombreExistente = Array.from(nombresExistentes).some(sector => sector.textContent === nombre)

    if (nombreExistente) {
      alert('El nombre ya existe. Por favor elige otro.')
      return
    }

    // Crear el nuevo sector
    const nuevoSector = document.createElement('div')
    nuevoSector.classList.add('sector')
    nuevoSector.style.backgroundColor = colorSeleccionado // Asignar el color
    nuevoSector.textContent = nombre // Asignar el nombre

    // Añadir el nuevo sector al contenedor
    const contenedor = document.querySelector('.background-container')
    contenedor.appendChild(nuevoSector)

    // Limpiar los campos después de agregar la caja
    input.value = ''
    document.querySelectorAll('.color-item').forEach(i => i.classList.remove('selected'))
  } else {
    alert('Por favor ingresa un nombre y selecciona un color.')
  }
}

// Funcionalidad para agregar sectores dinámicos al hacer clic en el botón
boton.addEventListener('click', agregarCaja)

// Funcionalidad para agregar sectores dinámicos al presionar Enter
input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    agregarCaja()
  }
})

// Selección de color
colorItems.forEach(item => {
  item.addEventListener('click', function () {
    // Elimina la selección previa
    colorItems.forEach(i => i.classList.remove('selected'))
    // Marca el nuevo color como seleccionado
    this.classList.add('selected')
  })
})
