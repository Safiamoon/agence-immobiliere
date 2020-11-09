import axios from 'axios';

class BookingServices {
    getBookings(){
        return axios.get("https://app-booking-christ.herokuapp.com/api/booking")
    }
    getCurrentBookingDetail(id) {
        return axios.get(`https://app-booking-christ.herokuapp.com/api/booking/${id}`);
    }
}

export default new BookingServices();