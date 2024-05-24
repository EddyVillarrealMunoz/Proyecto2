import axios from "axios";

const CLIENTE_BASE_REST_API_URL = "http://localhost:8080/api/v1/clientes";

class ClienteService {

    getClientes() {
        return axios.get(CLIENTE_BASE_REST_API_URL);
    }

    getClientesByProveedor(proveedorId) {
        return axios.get(`${CLIENTE_BASE_REST_API_URL}/proveedor/${proveedorId}`);
    }

    saveCliente(cliente, proveedorId) {
        return axios.post(`${CLIENTE_BASE_REST_API_URL}?proveedorId=${proveedorId}`, cliente);
    }

    getClienteById(idP) {
        return axios.get(CLIENTE_BASE_REST_API_URL + '/' + idP);
    }

    updateCliente(id, cliente) {
        return axios.put(CLIENTE_BASE_REST_API_URL + '/' + id, cliente);
    }

    deleteCliente(clienteId) {
        return axios.delete(CLIENTE_BASE_REST_API_URL + '/' + clienteId);
    }
}

export default new ClienteService;