import axios from 'axios';

class BookingServices {
    getBookings(){
        return axios.get("https://app-booking-christ.herokuapp.com/api/booking")
    }
    getCurrentBookingDetail(id) {
        return axios.get(`https://app-booking-christ.herokuapp.com/api/booking/${id}`);
    }
    newBooking(createBooking) {
        return axios.post(`https://app-booking-christ.herokuapp.com/api/booking/${createBooking}`);
    }
}

export default new BookingServices();