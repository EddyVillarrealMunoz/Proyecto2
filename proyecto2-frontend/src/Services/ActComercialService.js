import axios from "axios";

const ACTCOMERCIAL_BASE_REST_API_URL = "http://localhost:8080/api/v1/actcomerciales";

class ActComercialService {
    getActComerciales() {
        return axios.get(ACTCOMERCIAL_BASE_REST_API_URL);
    }

    getActComercialById(id){
        return axios.get(ACTCOMERCIAL_BASE_REST_API_URL + '/'  + id);
    }
}

export default new ActComercialService();