import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ClientServices from '../Services/ClientServices';

class Appartements extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clients:[],
            currentClient: {
                    id:null,
                    firstName: "",
                    lastName : "",
                    phone: "",
                    birthDate : "",
                    nationality : "",
                    bookings : []
                
            },

            createClient: {
                
                firstName: "",
                lastName : "",
                email: "",
                phone: "",
                nationality : "",
                birthDate : ""
            
        }
        }
    }

    componentDidMount() {

        ClientServices.getClients().then( (response) => {
            this.setState( { clients: response.data.clients } )
        });

    }

    
    getClient(id) {
        ClientServices.getCurrentClientDetail(id).then( (response) => {
            this.setState({currentClient : response.data.client});
        });
    }

    // createClient() {
    //     ClientServices.createClient().then( () => {
    //         this.setState({createClient : this.response.data.client})
    //     });
    // }

    render(){ 
    return (
        <>
        <Navbar />
        <h1 className = "text-center" > Clients list </h1>
        <button type="button" class="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Client</button>
        {/* Add client modal */}
        {/* <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Client firstname: {this.state.createClient.firstName}</label>
                            <input type="text" className="form-control" id="recipient-name"/>
                        </div>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Client lastname: {this.state.createClient.lastName}</label>
                            <input type="text" className="form-control" id="recipient-name"/>
                        </div>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Client phone: {this.state.createClient.phone}</label>
                            <input type="text" className="form-control" id="recipient-name"/>
                        </div>
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Client nationality: {this.state.createClient.nationality}</label>
                            <input type="text" className="form-control" id="recipient-name"/>
                        </div>     
                        <div className="form-group">
                            <label for="recipient-name" className="col-form-label">Client birthdate: {this.state.createClient.birthDate}</label>
                            <input type="text" className="form-control" id="recipient-name"/>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={this.createClient(this.state.createClient.id)}>Save changes</button>
                </div>
                </div>
            </div>
        </div> */}

        <hr></hr>

                <table className = "table table-striped">
                    <thead>
                        <tr>
                            <td> Client Id </td>
                            <td> Client First Name </td>
                            <td> Client Last Name </td>
                            <td> Client Phone</td>
                            <td> Client Nationality </td>
                            <td> Client Birth Date </td>
                            <td> Edit Client </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.clients.map(
                                client =>
                                <tr key = {client.id}>
                                    <td> {client.id} </td>
                                    <td> {client.firstName} </td>
                                    <td> {client.lastName} </td>
                                    <td> {client.phone} </td>
                                    <td> {client.nationality} </td>
                                    <td> {client.birthDate} </td>
                                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>this.getClient(client.id)}>See</button></td>
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
                            <h5 className="modal-title" id="exampleModalLongTitle">SEE CLIENT DETAILS</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <h5> FirstName : {this.state.currentClient.firstName}</h5>
                            <h5> LastName : {this.state.currentClient.lastName}</h5>
                            <h5> Phone :{this.state.currentClient.phone}</h5>
                            <h5> Nationality : {this.state.currentClient.nationality}</h5>
                            <h5> BirthDate : {this.state.currentClient.birthDate}</h5>
                            <h5>Bookings :</h5>
                            <hr></hr>
                            {
                            this.state.currentClient.bookings.map(
                                booking =>
                                <div key = {booking.id}>
                                        <div> Created at : {booking.createdAt} </div>
                                        <div> Updated at : {booking.updatedAt} </div>
                                        <div> Room number: {booking.room.price} </div>
                                        <div> Room area: {booking.room.price} </div>
                                        <div> Room price: {booking.room.price} </div>
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