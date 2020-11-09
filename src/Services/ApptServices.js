import axios from 'axios';

class ApptServices {
    getAppartements(){
        return axios.get("https://app-booking-christ.herokuapp.com/api/apartment");
    }

    getCurrentApartmentDetail(id) {
        return axios.get("https://app-booking-christ.herokuapp.com/api/apartment"+"/"+id);
    }

    createApartment() {
        return axios.post(`https://app-booking-christ.herokuapp.com/api/apartment`);
    }
}

export default new ApptServices();