import axios from "axios";

const FACTURA_BASE_REST_API_URL = "http://localhost:8080/api/v1/facturas";

class FacturaService {

    getFacturas() {
        return axios.get(FACTURA_BASE_REST_API_URL);
    }

    // En FacturaService.js
    saveFactura(factura, listFacturaDetalles) {
        return axios.post(FACTURA_BASE_REST_API_URL, { factura, listFacturaDetalles });
    }

    getFacturaById(facturaId) {
        return axios.get(FACTURA_BASE_REST_API_URL + '/' + facturaId);
    }

    updateFactura(id, factura) {
        return axios.put(FACTURA_BASE_REST_API_URL + '/' + id, factura);
    }

    deleteFactura(facturaId) {
        return axios.delete(FACTURA_BASE_REST_API_URL + '/' + facturaId);
    }
}

export default new FacturaService;

//console.log(JSON.stringify(factura, null, 2));