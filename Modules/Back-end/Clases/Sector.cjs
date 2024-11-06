const fs = require('node:fs')
const path = require('path')

class Sector {
  #nombre
  #color

  constructor ({ nombre, color = undefined, Load = false, Dir = undefined }) {
    this.#nombre = nombre
    this.#color = color
    if (Load) {
      this.Cargar(nombre, Dir)
    }
  }

  set nombreSec (nom) {
    this.#nombre = nom
  }

  get nombreSec () {
    return this.#nombre
  }

  set colorSec (col) {
    this.#color = col
  }

  get colorSec () {
    return this.#color
  }

  // Función para guardar los datos en JSON
  Guardar (dir) {
    const boxJSON = JSON.stringify({
      Nombre: this.#nombre,
      Color: this.#color
    }, null, 2)
    fs.writeFile(path.join(dir, `${this.#nombre}.json`), boxJSON, err => {
      if (err) console.error(err)
    })
  }

  // Función para cargar los datos desde JSON
  Cargar (nombre, dir) {
    const data = fs.readFileSync(path.join(dir, `${nombre}.json`), (err) => {
      if (err) {
        console.log(err)
      }
    })
    const datos = JSON.parse(data)
    this.#nombre = datos.Nombre
    this.#color = datos.Color
  }
}

module.exports = {
  Sector
}
