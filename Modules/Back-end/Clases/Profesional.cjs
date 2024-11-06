const fs = require('node:fs')
const { Disponibilidad } = require('./Disponibilidad.cjs') // Asegúrate de importar la clase
const path = require('path')

class Profesional {
  #Rut
  #Correo
  #Nombre
  #Apellido
  #Especialidad
  #disponibilidad

  constructor ({ Rut = undefined, Nombre = undefined, Apellido = undefined, Especialidad = undefined, disponibilidad = undefined, Correo = undefined, Load = false, Dir = undefined }) {
    this.#Rut = Rut
    this.#Correo = Correo
    this.#Nombre = Nombre
    this.#Apellido = Apellido
    this.#Especialidad = Especialidad
    this.#disponibilidad = disponibilidad || new Disponibilidad() // Asociación a Disponibilidad
    if (Load === true) {
      this.Cargar(Rut, Dir)
    }
  }

  // Getters y setters para los atributos privados
  get CorreoProf () {
    return this.#Correo
  }

  set CorreoProf (correo) {
    this.#Correo = correo
  }

  get RutProf () {
    return this.#Rut
  }

  set RutProf (rut) {
    this.#Rut = rut
  }

  get NombreProf () {
    return this.#Nombre
  }

  set NombreProf (nombre) {
    this.#Nombre = nombre
  }

  get ApellidoProf () {
    return this.#Apellido
  }

  set ApellidoProf (apellido) {
    this.#Apellido = apellido
  }

  get EspecialidadProf () {
    return this.#Especialidad
  }

  set EspecialidadProf (especialidad) {
    this.#Especialidad = especialidad
  }

  get DisponibilidadProf () { // Cambio del nombre del método
    return this.#disponibilidad
  }

  set DisponibilidadProf (nuevaDisponibilidad) {
    this.#disponibilidad = nuevaDisponibilidad
  }

  get vacaciones () {
    return this.#disponibilidad.vacaciones
  }

  set vacaciones (vac) {
    this.#disponibilidad.vacaciones = vac
  }

  // Función para guardar los datos en JSON
  Guardar (dir) {
    const profesionalJSON = JSON.stringify({
      rut: this.#Rut,
      correo: this.#Correo,
      nombre: this.#Nombre,
      apellido: this.#Apellido,
      especialidad: this.#Especialidad,
      disponibilidad: this.#disponibilidad // Asegúrate de serializar correctamente
    }, null, 2)
    fs.writeFile(path.join(dir, `${this.#Rut}.json`), profesionalJSON, err => {
      if (err) console.error(err)
    })
  }

  // Función para cargar los datos desde JSON
  Cargar (rut, dir) {
    const data = fs.readFileSync(path.join(dir, `${rut}.json`), (err) => {
      if (err) {
        console.log(err)
      }
    })
    const datos = JSON.parse(data)
    this.#Rut = datos.rut
    this.#Nombre = datos.nombre
    this.#Apellido = datos.apellido
    this.#Especialidad = datos.especialidad
    this.#disponibilidad = new Disponibilidad(datos.disponibilidad) // Reconstrucción del objeto Disponibilidad
    this.#disponibilidad.vacaciones = datos.disponibilidad.vacas
  }
}

module.exports = {
  Profesional
}
