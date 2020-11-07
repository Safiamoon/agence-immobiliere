import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Navbar from '../Navbar';
import BookingServices from '../Services/BookingServices';

class Booking extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bookings:[]
        }
    }

    componentDidMount() {

        BookingServices.getBookings().then( (response) => {
            this.setState( { bookings: response.data.bookings } )
        });
    }
    
    getBooking(id) {
        BookingServices.getCurrentBooking(id).then( (response) => {
            this.setState( { bookings: response.data.bookings } )
        });
    }


    render(){ 
    return (
        <>
        <Navbar />
            <h1 className = "text-center" > Booking List </h1>
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
                                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.getBooking(booking.id)}>See</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Edit client</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        {
                            this.state.bookings.map(
                                booking =>
                                <tr key = {booking.id}>
                                    <td> {booking.id} </td>
                                    <td> {booking.client.firstName} </td>
                                    <td> {booking.client.lastName} </td>
                                    <td> {booking.createdAt} </td>
                                    <td> {booking.updatedAt} </td>
                                    {/* <td><button type="button" class="btn btn-danger" onClick={this.deleteBooking(booking.id)}>Delete</button></td> */}
                                    <td><button type="button" class="btn btn-info" >See</button></td>
                                </tr>
                            )
                        }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
}

export default Booking;