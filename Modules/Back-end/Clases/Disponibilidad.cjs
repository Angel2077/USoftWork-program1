class Disponibilidad {
  constructor (horarios = {}) {
    this.horarios = {
      lunes: horarios.lunes || { inicio: 0, fin: 0 },
      martes: horarios.martes || { inicio: 0, fin: 0 },
      miercoles: horarios.miercoles || { inicio: 0, fin: 0 },
      jueves: horarios.jueves || { inicio: 0, fin: 0 },
      viernes: horarios.viernes || { inicio: 0, fin: 0 },
      sabado: horarios.sabado || { inicio: 0, fin: 0 },
      domingo: horarios.domingo || { inicio: 0, fin: 0 }
    }
  }

  establecerDisponibilidad (dia, horaInicio, horaFin) {
    if (this.horarios[dia]) {
      this.horarios[dia].inicio = horaInicio
      this.horarios[dia].fin = horaFin
    } else {
      throw new Error(`El día ${dia} no es válido.`)
    }
  }

  actualizarHorario (dia, nuevoInicio, nuevoFin) {
    if (this.horarios[dia]) {
      this.horarios[dia].inicio = nuevoInicio
      this.horarios[dia].fin = nuevoFin
    } else {
      throw new Error(`Día ${dia} no válido`)
    }
  }

  getDisponibilidad (dia) {
    if (this.horarios[dia]) {
      return this.horarios[dia]
    } else {
      throw new Error(`El día ${dia} no es válido.`)
    }
  }

  estaDisponible (dia, hora) {
    if (this.horarios[dia]) {
      const { inicio, fin } = this.horarios[dia]
      return hora >= inicio && hora <= fin
    } else {
      throw new Error(`El día ${dia} no es válido.`)
    }
  }
}

module.exports = {
  Disponibilidad
}
