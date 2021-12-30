import { Router, Request, Response } from "express";
import { Grafica } from "../classes/grafica";
import { Mapa } from "../classes/mapa";
import SocketServer from "../classes/server";
import { usuariosConectados } from "../sockets/sockets";

const router = Router();

const grafica = new Grafica();

router.get("/marcadores", (req, res: Response) => {
	let mapa = Mapa.mapaInstance;

	res.json(mapa.getMarcadores());
	console.log(mapa.getMarcadores());
});

router.post("/grafica", (req: Request, res: Response) => {
	let server = SocketServer.instance;
	let mes = req.body.mes;
	let valor = JSON.parse(req.body.valor);

	res.json({
		ok: true,
		msj: grafica.incrementarValor(mes, valor),
	});

	let payload = grafica.incrementarValor(mes, valor);

	server.io.emit("cambio-grafica", payload);
});

router.get("/grafica", (req: Request, res: Response) => {
	res.json({
		ok: true,
		msj: grafica.getDataGrafica(),
	});
});

router.get("/mensajes", (req: Request, res: Response) => {
	res.json({
		ok: true,
		msj: "get listoo",
	});
});

router.post("/mensajes", (req: Request, res: Response) => {
	const cuerpo = req.body.cuerpo;
	const de = req.body.de;

	res.json({
		ok: true,
		msj: "post listo",
		cuerpo,
		de,
	});
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
	const cuerpo = req.body.cuerpo;
	const de = req.body.de;
	const id = req.params.id;

	const payload = {
		de,
		cuerpo,
	};

	const server = SocketServer.instance;

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

router.get("/usuarios", (req: Request, res: Response) => {
	res.json({
		ok: true,
		listaUsuarios: usuariosConectados.getLista(),
	});
});

export default router;
