"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const grafica_1 = require("../classes/grafica");
const mapa_1 = require("../classes/mapa");
const server_1 = __importDefault(require("../classes/server"));
const sockets_1 = require("../sockets/sockets");
const router = (0, express_1.Router)();
const grafica = new grafica_1.Grafica();
router.get("/marcadores", (req, res) => {
    let mapa = mapa_1.Mapa.mapaInstance;
    res.json(mapa.getMarcadores());
    console.log(mapa.getMarcadores());
});
router.post("/grafica", (req, res) => {
    let server = server_1.default.instance;
    let mes = req.body.mes;
    let valor = JSON.parse(req.body.valor);
    res.json({
        ok: true,
        msj: grafica.incrementarValor(mes, valor),
    });
    let payload = grafica.incrementarValor(mes, valor);
    server.io.emit("cambio-grafica", payload);
});
router.get("/grafica", (req, res) => {
    res.json({
        ok: true,
        msj: grafica.getDataGrafica(),
    });
});
router.get("/mensajes", (req, res) => {
    res.json({
        ok: true,
        msj: "get listoo",
    });
});
router.post("/mensajes", (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        ok: true,
        msj: "post listo",
        cuerpo,
        de,
    });
});
router.post("/mensajes/:id", (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    const payload = {
        de,
        cuerpo,
    };
    const server = server_1.default.instance;
    server.io.to(id).emit("mensaje-privado", payload);
    res.json({
        ok: true,
        msj: "post listo",
        cuerpo,
        de,
        id,
    });
});
// router.get("/usuarios", (req: Request, res: Response) => {
// 	const server = SocketServer.instance;
// 	server.io.clients((err: any, clientes: string[]) => {
// 		if (err) {
// 			return res.json({
// 				ok: false,
// 				err,
// 			});
// 		}
// 		res.json({
// 			ok: true,
// 			clientes,
// 		});
// 	});
// });
router.get("/usuarios", (req, res) => {
    res.json({
        ok: true,
        listaUsuarios: sockets_1.usuariosConectados.getLista(),
    });
});
exports.default = router;
