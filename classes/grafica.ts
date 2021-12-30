export class Grafica {
	private valores = [1, 2, 3, 4];
	private meses = ["enero", "febrero", "marzo", "abril"];

	constructor() {}

	getDataGrafica() {
		return [{ data: this.valores, label: "Series A" }];
	}

	incrementarValor(mes: string, valor: number) {
		for (let i in this.meses) {
			if (mes === this.meses[i]) {
				this.valores[i] += valor;
			}
		}

		return this.getDataGrafica();
	}
}
