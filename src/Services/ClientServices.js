import axios from 'axios';

class ClientServices {
    
    getClients() {
        return axios.get("https://app-booking-christ.herokuapp.com/api/client");
    }

    getCurrentClient(id) {
        return axios.get(`https://app-booking-christ.herokuapp.com/api/client/${id}`);
    }
}

export default new ClientServices();