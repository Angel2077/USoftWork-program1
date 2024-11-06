document.addEventListener('DOMContentLoaded', function () { // Espera a que el DOM esté completamente cargado
  const boton = document.getElementById('boton')
  const containerAb = document.querySelector('.container-ab')

  boton.addEventListener('click', function () {
    const select1 = document.getElementById('especialidad').value
    const select2 = document.getElementById('turno').value
    const nombre = document.getElementById('nombre').value

    // Verifica que los datos no estén vacíos
    if (select1 && select2 && nombre) {
      const nuevaCaja = document.createElement('div')
      nuevaCaja.classList.add('ab')

      nuevaCaja.innerHTML = `
        <h4>${nombre}</h4>
        <p>Especialidad: ${select1}</p>
        <p>Turno: ${select2}</p>
      `

      containerAb.appendChild(nuevaCaja)

      // Limpiar los campos
      document.getElementById('nombre').value = ''
      document.getElementById('especialidad').selectedIndex = 0
      document.getElementById('turno').selectedIndex = 0
    } else {
      // eslint-disable-next-line no-undef
      alert('Por favor, completa todos los campos antes de guardar.')
    }
  })
})
