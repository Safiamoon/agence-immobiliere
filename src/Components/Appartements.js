import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Navbar from '../Navbar';
import ApptServices from '../Services/ApptServices';

class Appartements extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            apartments:[],
            currentApartment:{
                id:null,
                number: "",
                name: "",
                rooms: []
            },
            createApartment:{
                number: "",
                name: "",
                rooms: [
                    {
                        number:"",
                        area: "",
                        price: ""
                    }
                ]
            }
        }
    }

    componentDidMount() {

        ApptServices.getAppartements().then( (response) => {
            this.setState( { apartments: response.data.apartments } )
        });

    }

    getApartment(id) {
        // console.log("id is :" + id)
        ApptServices.getCurrentApartmentDetail(id).then( (response) => {
            // console.log("Response data is :" + response.data.test.map(item =>item.number));
            this.setState({currentApartment : this.state.apartments.filter(item => item.id==id)[0]})
            // console.log("current appartment is :" + this.state.currentApartment.id)
        });
    }

    // createApartment() {
    //     ApptServices.createApartment().then( () => {
    //         this.setState({createApartment : this.response})
    //     });
    // }

    render(){ 
    return (
        <>
        <Navbar />
        <h1 className = "text-center"> Apartments list </h1>
        {/* Add apartment */}
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Apartement</button>
        {/* Add apartment modal */}
        {/* <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Apartment</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Apartment number: {this.state.createApartment.number}</label>
                        <input type="text" className="form-control" id="recipient-name"/>
                    </div>
                    <div className="form-group">
                        <label for="recipient-name" className="col-form-label">Apartment price: {this.state.createApartment.price}</label>
                        <input type="text" className="form-control" id="recipient-name"/>
                    </div>
                    {
                    this.state.createApartment.rooms.map(
                        newApartmentRoom =>
                        <div key = {newApartmentRoom.id}>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Room ID: {newApartmentRoom.id}</label>
                                <input type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Room number: {newApartmentRoom.number}</label>
                                <input type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Room area: {newApartmentRoom.area}</label>
                                <input type="text" className="form-control" id="recipient-name"/>
                            </div>
                            <div className="form-group">
                                <label for="recipient-name" className="col-form-label">Room price: {newApartmentRoom.price}</label>
                                <input type="text" className="form-control" id="recipient-name"/>
                            </div>
                        </div>
                    )
                    }
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.createApartment(this.state.createApartment.id)}>Save changes</button>
                </div>
                </div>
            </div>
        </div> */}

        <hr></hr>

        {/* retrieved data */}
        <table className = "table table-striped">
            <thead>
                <tr>
                    <td> Apartment Id </td>
                    <td> Apartment Number </td>
                    <td> Apartment Name </td>
                    <td> More details </td>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.apartments.map(
                        apartment =>
                        <tr key = {apartment.id}>
                            <td> {apartment.id} </td>
                            <td> {apartment.number} </td>
                            <td> {apartment.name} </td>
                            <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>this.getApartment(apartment.id)}>See</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>

        {/* See details modal  */}
        <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">SEE APARTMENT DETAILS</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <h5>Apartment number : {this.state.currentApartment.number} </h5>
                        <h5>Apartment name : {this.state.currentApartment.name} </h5>
                        <h5>Rooms :</h5>
                        <hr></hr>
                        {
                            this.state.currentApartment.rooms.map(
                                room =>
                                <div key = {room.id}>
                                        <div> Room number : {room.number} </div>
                                        <div> Room area : {room.area} </div>
                                        <div> Room price : {room.price} </div>
                                        <hr></hr>
                                    </div>
                            )
                        }
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

export default Appartements;