"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapa = void 0;
class Mapa {
    constructor() {
        //singletone
        this.marcadores = {
            1: {
                id: "1",
                nombre: "Fernando",
                lng: -75.75512993582937,
                lat: 45.349977429009954,
                color: "#dd8fee",
            },
            2: {
                id: "2",
                nombre: "Amy",
                lng: -75.75195645527508,
                lat: 45.351584045823756,
                color: "#790af0",
            },
            3: {
                id: "3",
                nombre: "Orlando",
                lng: -75.75900589557777,
                lat: 45.34794635758547,
                color: "#19884b",
            },
        };
    }
    static get mapaInstance() {
        return this._mapaInstance || (this._mapaInstance = new this());
    }
    getMarcadores() {
        return this.marcadores;
    }
    borrarMarcador(id) {
        delete this.marcadores[id];
        return this.getMarcadores();
    }
    moverMarcador(payload) {
        this.marcadores[payload.id].lng = payload.lng;
        this.marcadores[payload.id].lat = payload.lat;
    }
    agregarMarcador(marcador) {
        this.marcadores[marcador.id] = marcador;
        console.log(this.marcadores);
        return this.getMarcadores();
    }
}
exports.Mapa = Mapa;
