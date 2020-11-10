import axios from 'axios';

class ClientServices {
    
    getClients() {
        return axios.get("https://app-booking-christ.herokuapp.com/api/client");
    }

    getCurrentClientDetail(id) {
        return axios.get(`https://app-booking-christ.herokuapp.com/api/client/${id}`)
    }

    createClient(addClient) {
        return axios.post(`https://app-booking-christ.herokuapp.com/api/client/${addClient}`);
    }
}

export default new ClientServices();