class Sector {
  constructor (nombre, color) {
    this.nombre = nombre
    this.color = color
  }

  set nombre (nom) {
    this.nombre = nom
  }

  get nombre () {
    return this.nombre
  }

  set color (col) {
    this.color = col
  }

  get color () {
    return this.color
  }
}

module.exports = {
  Sector
}
