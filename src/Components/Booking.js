import React from 'react';
import Navbar from '../Navbar';
import BookingServices from '../Services/BookingServices';
import axios from 'axios';

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
            },
            addBooking:{
                createdAt:"",
                updatedAt:"",
                client:{
                    firstName:"",
                    lastName:""
                },
                room:{
                    apartment:{}
                }
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        var bookingToAdd = {...this.state.addBooking}
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        bookingToAdd [inputName] = inputValue;
        this.setState({
            addBooking : bookingToAdd 
        });        
    }

    
    handleSubmit(event) {

        event.preventDefault();
        const json = JSON.stringify(this.state.addBooking);
        console.log(json);
        axios.post("https://app-booking-christ.herokuapp.com/api/booking",this.state.addBooking).then( (response) => {
            console.log(response.data);
            this.props.history.push("/reservation");   
            // <Redirect to ={this.state.redirect}></Redirect>
        });
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

    // createBooking(createBooking){
    //     BookingServices.newBooking(createBooking).then((response)=>{
    //         console.log("Response data is :" + response.data);
    //         // this.setState({createBooking : response.data.booking})
    //         // console.log("created booking is :" + this.state.createBooking)

    //     })
    // }

    render(){ 
    return (
        <>
        <Navbar />
            <h1 className = "text-center" > Bookings list </h1>
            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Booking</button>
            {/* Add booking modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add new Booking</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Client FirstName :
                            <div className="form-item">
                                <input type="text" name="firstName" 
                                    className="form-control" placeholder="FirstName"
                                    inputValue={this.state.addBooking.client.firstName} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                            Client LastName :
                            <div className="form-item">
                                <input type="text" name="lastName" 
                                    className="form-control" placeholder="LastName"
                                    inputValue={this.state.addBooking.client.lastName} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                            Created at :
                            <div className="form-item">
                                <input type="text" name="createdAt" 
                                    className="form-control" placeholder="CreatedAt"
                                    inputValue={this.state.addBooking.createdAt} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                            Updated at:
                            <div className="form-item">
                                <input type="text" name="updatedAt" 
                                    className="form-control" placeholder="UpdatedAt"
                                    inputValue={this.state.addBooking.updatedAt} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        {/* <label>
                            Apartment Rooms :
                                <table className = "table table-striped">
                                    <thead>
                                        <tr>
                                            <td className="form-item">Number</td>
                                            <td className="form-item">Area</td>
                                            <td className="form-item">Price</td>
                                            <td className="form-item">Add</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.rows.map(row => <tr>
                                            <td><div className="form-item">
                                                <input type="text" name="number" 
                                                        className="form-control" placeholder="Number"
                                                        inputValue={this.state.room.number} onChange={this.handleRoomChange} required/>
                                                </div></td>
                                                    <td><div className="form-item">
                                                        <input type="text" name="area" 
                                                            className="form-control" placeholder="Area"
                                                            inputValue={this.state.room.area} onChange={this.handleRoomChange} required/>
                                                    </div></td>
                                                    <td><div className="form-item">
                                                        <input type="text" name="price" 
                                                            className="form-control" placeholder="Price"
                                                            inputValue={this.state.room.price} onChange={this.handleRoomChange} required/>
                                                    </div></td>
                                                    <td>
                                                    <button type="button" className="btn btn-block btn-primary" onClick={this.addRow} >Add Room</button>
                                                    </td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                    </label> */}
                        <div className="form-item">
                            <button type="submit" className="btn btn-block btn-primary">
                                Add Booking
                            </button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
            </div>
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
                                    <td><button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>this.getBooking(booking.id)}>See</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {/* See details modal */}
                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
