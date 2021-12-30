"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marcadorNuevo = exports.configurarUsuario = exports.mensajePrivado = exports.mensaje = exports.desconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuario_1 = require("../classes/usuario");
const usuarios_lista_1 = require("../classes/usuarios-lista");
const mapa_1 = require("../classes/mapa");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
const conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
    io.emit("usuarios-conectados", exports.usuariosConectados.getLista());
};
exports.conectarCliente = conectarCliente;
const desconectar = (cliente, io) => {
    cliente.on("disconnect", () => {
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit("usuarios-conectados", exports.usuariosConectados.getLista());
    });
};
exports.desconectar = desconectar;
const mensaje = (cliente, io) => {
    cliente.on("mensaje", (payload) => {
        io.emit("mensaje-nuevo", { payload, id: cliente.id });
    });
};
exports.mensaje = mensaje;
const mensajePrivado = (cliente, io) => {
    cliente.on("mensajePrivado", (payload) => {
        io.to(payload.id).emit("mensaje-privado", {
            payload,
            id: cliente.id,
        });
    });
};
exports.mensajePrivado = mensajePrivado;
const configurarUsuario = (cliente, io) => {
    cliente.on("config-usuario", (nombre, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, nombre);
        let user = Object.values(nombre);
        callback({
            ok: true,
            usuario: user,
            id: cliente.id,
        });
        io.emit("usuarios-conectados", exports.usuariosConectados.getLista());
    });
};
exports.configurarUsuario = configurarUsuario;
const marcadorNuevo = (cliente, io) => {
    let mapa = mapa_1.Mapa.mapaInstance;
    cliente.on("nuevo-marcador", (marcador) => {
        cliente.broadcast.emit("marcador-nuevo", marcador);
        mapa.agregarMarcador(marcador);
        console.log(mapa.marcadores);
    });
    cliente.on("borrar-marcador", (id) => {
        cliente.broadcast.emit("marcador-borrar", id);
        mapa.borrarMarcador(id);
    });
    cliente.on("mover-marcador", (payload) => {
        mapa.moverMarcador(payload);
        cliente.broadcast.emit("marcador-mover", payload);
    });
};
exports.marcadorNuevo = marcadorNuevo;
