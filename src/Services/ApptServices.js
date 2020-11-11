import axios from 'axios';

class ApptServices {
    getAppartements(){
        return axios.get("https://app-booking-christ.herokuapp.com/api/apartment");
    }

    getCurrentApartmentDetail(id) {
        return axios.get("https://app-booking-christ.herokuapp.com/api/apartment"+"/"+id);
    }

}

export default new ApptServices();