import axios from "axios";

const FACTURA_BASE_REST_API_URL = "http://localhost:8080/api/v1/facturas";

class FacturaService {

    getFacturas(proveedorId) {
        return axios.get(`${FACTURA_BASE_REST_API_URL}?proveedorId=${proveedorId}`);
    }

    saveFactura(factura, listFacturaDetalles) {
        return axios.post(FACTURA_BASE_REST_API_URL, { factura, listFacturaDetalles });
    }

    getFacturaById(facturaId) {
        return axios.get(FACTURA_BASE_REST_API_URL + '/' + facturaId);
    }

    getProductDescription(productId) {
        return axios.get(`http://localhost:8080/api/v1/productos/${productId}`)
            .then(response => response.data.description)
            .catch(error => {
                console.error("Error al obtener la descripción del producto:", error);
                return null;
            });
    }

    getProductIVA(productId) {
        return axios.get(`http://localhost:8080/api/v1/productos/${productId}`)
            .then(response => response.data.ivaFee)
            .catch(error => {
                console.error("Error al obtener el IVA del producto:", error);
                return null;
            });
    }

    getProductPrice(productId) {
        return axios.get(`http://localhost:8080/api/v1/productos/${productId}`)
            .then(response => response.data.price)
            .catch(error => {
                console.error("Error al obtener el precio del producto:", error);
                return null;
            });
    }

}

export default new FacturaService;