import axios from "axios";

const FACTURA_BASE_REST_API_URL = "http://localhost:8080/api/v1/facturas";

class FacturaService {

    getFacturas() {
        return axios.get(FACTURA_BASE_REST_API_URL);
    }

    saveFactura(factura) {
        return axios.post(FACTURA_BASE_REST_API_URL, factura);
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