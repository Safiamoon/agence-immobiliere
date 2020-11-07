import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import ClientServices from '../Services/ClientServices';

class Appartements extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            clients:[],
            currentClient: {
                
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
        ClientServices.getCurrentClient(id).then( () => {
            this.setState({currentClient : this.response})
        });
    }

    render(){ 
    return (
        <>
        <Navbar />
        <h1 className = "text-center" > Client List </h1>
        <button type="button" class="btn btn-success">Add Client</button>
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
                                    <td><button type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={this.getClient(client.id)}>See</button></td>
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
                            this.state.clients.map(
                                client =>
                                <div key = {client.id}>
                                    <div>Client id : {client.id} </div>
                                    <div>Client firstName : {client.firstName} </div>
                                    <div>Client lastName : {client.lastName} </div>
                                    <div>Client phone :{client.phone} </div>
                                    <div>Client nationality : {client.nationality} </div>
                                    <div>Client birthDate : {client.birthDate} </div>
                                </div>
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

export default Appartements;