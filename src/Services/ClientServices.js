import axios from 'axios';

class ClientServices {
    
    getClients() {
        return axios.get("https://app-booking-christ.herokuapp.com/api/client");
    }

    getCurrentClientDetail(id) {
        return axios.get(`https://app-booking-christ.herokuapp.com/api/client/${id}`)
    }

    createClient() {
        return axios.post(`https://app-booking-christ.herokuapp.com/api/client`);
    }
}

export default new ClientServices();