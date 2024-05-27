import axios from "axios";

const PROVEEDOR_BASE_REST_API_URL = "http://localhost:8080/api/v1/proveedores";

class ProveedorService {

    getProveedores() {
        return axios.get(PROVEEDOR_BASE_REST_API_URL);
    }

    getProveedorById(proveedorId) {
        return axios.get(PROVEEDOR_BASE_REST_API_URL + '/' + proveedorId);
    }

    getActComercialesByProveedorId(proveedorId) {
        return axios.get(PROVEEDOR_BASE_REST_API_URL + '/actcomerciales' + '/' + proveedorId);
    }

    saveProveedor(proveedor) {
        return axios.post(PROVEEDOR_BASE_REST_API_URL, proveedor);
    }

    updateProveedor(id, proveedor) {
        return axios.put(PROVEEDOR_BASE_REST_API_URL + '/' + id, proveedor);
    }

    deleteProveedor(proveedorId) {
        return axios.delete(PROVEEDOR_BASE_REST_API_URL + '/' + proveedorId);
    }
}

export default new ProveedorService();