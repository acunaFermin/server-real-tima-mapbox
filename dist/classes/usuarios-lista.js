"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    agregar(usuario) {
        this.lista.push(usuario);
        console.log("agregar:", this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = Object.values(nombre)[0];
                break;
            }
        }
        console.log("======= Actualizando usuario =======");
        console.log("actualizarNombre:", this.lista);
    }
    getLista() {
        return this.lista.filter((usuario) => usuario.nombre !== "sin-nombre");
    }
    getUsuario(id) {
        this.lista.find((usuario) => {
            return usuario.id === id;
        });
    }
    getUsuariosEnSala(sala) {
        return this.lista.filter((usuario) => {
            return usuario.sala === sala;
        });
    }
    borrarUsuario(id) {
        const usuarioTemp = this.getUsuario(id);
        this.lista = this.lista.filter((usuario) => {
            return usuario.id !== id;
        });
        return usuarioTemp;
    }
}
exports.UsuariosLista = UsuariosLista;
