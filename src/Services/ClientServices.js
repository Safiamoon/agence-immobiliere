import axios from 'axios';

class ClientServices {
    
    getClients() {
        return axios.get("https://app-booking-christ.herokuapp.com/api/client");
    }

    getCurrentClientDetail(id) {
        return axios.get(`https://app-booking-christ.herokuapp.com/api/client/${id}`)
    }

}

export default new ClientServices();