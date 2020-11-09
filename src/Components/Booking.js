import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Navbar from '../Navbar';
import BookingServices from '../Services/BookingServices';

class Booking extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bookings:[],
            currentBooking :{
                createdAt : "",
                updatedAt : "",
                client: {},
                room :{
                    apartment: {}
                }
            }
        }
    }

    componentDidMount() {

        BookingServices.getBookings().then( (response) => {
            this.setState( { bookings: response.data.bookings } )
        });
    }
    
    getBooking(id) {
        BookingServices.getCurrentBookingDetail(id).then( (response) => {
            this.setState({currentBooking : response.data.booking})
        });
    }

    render(){ 
    return (
        <>
        <Navbar />
            <h1 className = "text-center" > Bookings list </h1>
            <button type="button" class="btn btn-success">Add Booking</button>
            <hr></hr>
                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Booking Id </td>
                            <td> Client first name </td>
                            <td> Client last name </td>
                            <td> createdAt </td>
                            <td> updatedAt </td>
                            <td> More details </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.bookings.map(
                                booking =>
                                <tr key = {booking.id}>
                                    <td> {booking.id} </td>
                                    <td> {booking.client.firstName} </td>
                                    <td> {booking.client.lastName} </td>
                                    <td> {booking.createdAt} </td>
                                    <td> {booking.updatedAt} </td>
                                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>this.getBooking(booking.id)}>See</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* See details modal */}
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">SEE BOOKING DETAILS</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5> Created at : {this.state.currentBooking.createdAt}</h5>
                            <h5> Updated at : {this.state.currentBooking.updatedAt}</h5>
                            <hr></hr>
                            <h5>Client informations :</h5>
                            <div> Client firstname : {this.state.currentBooking.client.firstName}</div>
                            <div> Client lastname : {this.state.currentBooking.client.lastName}</div>
                            <div> Client phone : {this.state.currentBooking.client.phone}</div>
                            <hr></hr>
                            <h5>Room informations:</h5>
                            <div> Room number : {this.state.currentBooking.room.number}</div>
                            <div> Room area : {this.state.currentBooking.room.area}</div>
                            <div> Room price : {this.state.currentBooking.room.price}</div>
                            <hr></hr>
                            <h5>Apartment informations:</h5>
                            <div> Apartment number : {this.state.currentBooking.room.apartment.number}</div>
                            <div> Apartment name : {this.state.currentBooking.room.apartment.name}</div>
                            <div> Apartment street : {this.state.currentBooking.room.apartment.street}</div>
                            <div> Apartment zipCode : {this.state.currentBooking.room.apartment.zipCode}</div>
                            <hr></hr>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
}

export default Booking;