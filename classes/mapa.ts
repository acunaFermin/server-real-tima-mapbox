import { Marcador } from "./marcador";

export class Mapa {
	//singletone
	private static _mapaInstance: Mapa;

	public static get mapaInstance() {
		return this._mapaInstance || (this._mapaInstance = new this());
	}
	//singletone

	marcadores: { [key: string]: Marcador } = {
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

	constructor() {}

	getMarcadores() {
		return this.marcadores;
	}

	borrarMarcador(id: string) {
		delete this.marcadores[id];
		return this.getMarcadores();
	}

	moverMarcador(payload: { id: string; lat: number; lng: number }) {
		this.marcadores[payload.id].lng = payload.lng;
		this.marcadores[payload.id].lat = payload.lat;
	}

	agregarMarcador(marcador: Marcador) {
		this.marcadores[marcador.id] = marcador;
		console.log(this.marcadores);
		return this.getMarcadores();
	}
}
