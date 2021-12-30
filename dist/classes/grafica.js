"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grafica = void 0;
class Grafica {
    constructor() {
        this.valores = [1, 2, 3, 4];
        this.meses = ["enero", "febrero", "marzo", "abril"];
    }
    getDataGrafica() {
        return [{ data: this.valores, label: "Series A" }];
    }
    incrementarValor(mes, valor) {
        for (let i in this.meses) {
            if (mes === this.meses[i]) {
                this.valores[i] += valor;
            }
        }
        return this.getDataGrafica();
    }
}
exports.Grafica = Grafica;
