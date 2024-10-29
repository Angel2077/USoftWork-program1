const path = require('path')
const fs = require('fs')
const os = require('os')
const { Profesional } = require('../../Back-end/Clases/Profesional.cjs')

const ruta = path.join(os.homedir(), 'Cefam', 'Personal')
const data = fs.readdirSync(ruta)

const boton = document.getElementById('boton')
const texto = document.querySelector('.texto')
const logo = document.querySelector('.logo')

function existencia (rut) {
  const data = fs.readdirSync(ruta)
  let res = true
  let index = 0
  if (data.length !== 0) {
    while (index < data.length) {
      if (path.basename(data[index], '.json') === rut) {
        res = false
      }
      index++
    }
  }
  return res
}

function presentarTarjeta (rut, nombre) {
  const fila = document.createElement('tr')
  const celdaNombre = document.createElement('td')
  celdaNombre.textContent = nombre
  const celdaRut = document.createElement('td')
  celdaRut.textContent = rut
  fila.appendChild(celdaNombre)
  fila.appendChild(celdaRut)
  document.querySelector('#tabla tbody').appendChild(fila)
}

if (data.length !== 0) {
  data.forEach(xd => {
    const pro = new Profesional({ Rut: path.basename(xd, '.json'), Load: true, Dir: ruta })
    presentarTarjeta(pro.RutProf, pro.NombreProf)
  })
}

boton.addEventListener('click', function () {
  // Capturar los valores de nombre y RUT
  const nombre = document.getElementById('nombre').value
  const rut = document.getElementById('rut').value

  if (nombre && rut) {
    if (existencia(rut)) {
      // se crea la instancia profecional para guardar la informacion
      const pro = new Profesional({ Rut: rut, Nombre: nombre, Load: false })
      pro.Guardar(ruta)

      presentarTarjeta(pro.RutProf, pro.NombreProf)

      // Limpiar los campos de texto
      document.getElementById('nombre').value = ''
      document.getElementById('rut').value = ''

      // Alternar la clase active para el botón y cambiar el texto y el logo
      boton.classList.toggle('active')

      if (boton.classList.contains('active')) {
        texto.textContent = 'OK'
        logo.style.opacity = 0
      } else {
        texto.textContent = 'Guardar'
        logo.style.opacity = 1
      }
    } else {
      globalThis.alert('Rut ya ingresado')
    }
  } else {
    globalThis.alert('Por favor, rellena ambos campos.')
  }
})
