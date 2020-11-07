import axios from 'axios';

class ApptServices {
    getAppartements(){
        return axios.get("https://app-booking-christ.herokuapp.com/api/apartment")
    }
}

export default new ApptServices();