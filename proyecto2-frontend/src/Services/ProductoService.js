import axios from "axios";

const PRODUCTO_BASE_REST_API_URL = "http://localhost:8080/api/v1/productos";

class ProductoService {

    getProductos(proveedorId) {
        return axios.get(`${PRODUCTO_BASE_REST_API_URL}?proveedorId=${proveedorId}`);
    }

    saveProducto(producto, proveedorId, actComercialId) {
        console.log("ProductoService: ", producto);
        return axios.post(`${PRODUCTO_BASE_REST_API_URL}`, producto, {
            params: {
                proveedorId: proveedorId,
                actComercialId: actComercialId
            }
        });
    }

    getProductoById(productoId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/' + productoId);
    }

    getActComercialById(productoId) {
        return axios.get(PRODUCTO_BASE_REST_API_URL + '/actcomercial' + '/' + productoId);
    }

    updateProducto(id, producto, proveedorId, actComercialId) {
        return axios.put(`${PRODUCTO_BASE_REST_API_URL}/${id}`, producto, {
            params: {
                proveedorId: proveedorId,
                actComercialId: actComercialId
            }
        });
    }

    deleteProducto(productoId) {
        return axios.delete(PRODUCTO_BASE_REST_API_URL + '/' + productoId);
    }
}

export default new ProductoService();