import axios from 'axios';
import React from 'react';
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

            addClient: {
                
                firstName: "",
                lastName : "",
                phone: "",
                nationality : "",
                birthDate : ""
            
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    //Add new client  
    handleInputChange(event) {
        var clientToAdd = {...this.state.addClient}
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        clientToAdd[inputName] = inputValue;
        this.setState({
            addClient : clientToAdd
        });        
    }

    handleSubmit(event) {

        event.preventDefault();
        const json = JSON.stringify(this.state.addClient);
        console.log(json);
        axios.post("https://app-booking-christ.herokuapp.com/api/client",this.state.addClient)
        .then( (response) => {
            console.log(response.data);
            window.location.reload(false);   
        }).catch((error)=>{
            console.log(error)
        });
    }

    componentDidMount() {
        //Get api clients
        ClientServices.getClients()
        .then( (response) => {
            this.setState( { clients: response.data.clients } )
        }).catch((error)=>{
            console.log(error)
        });

    }

    //See current client details
    getClient(id) {
        ClientServices.getCurrentClientDetail(id)
        .then( (response) => {
            this.setState({currentClient : response.data.client});
        }).catch((error)=>{
            console.log(error)
        });
    }



    render(){ 
    return (
        <>
        <Navbar />
        <h1 className = "text-center" data-test="title"> CLIENTS LIST </h1>
        <button type="button" class="btn btn-success" data-test="button-displayed" data-test2="display-modal" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Client</button>
        {/* Add client modal */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
                    <button type="button" data-test="close-modal" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Client firstname :
                            <div className="form-item">
                                <input type="text" name="firstName" 
                                    className="form-control" placeholder="FirstName"
                                    inputValue={this.state.addClient.firstName} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                        Client lastname :
                            <div className="form-item">
                                <input type="text" name="lastName" 
                                    className="form-control" placeholder="LastName"
                                    inputValue={this.state.addClient.lastName} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                        Client phone :
                            <div className="form-item">
                                <input type="text" name="phone" 
                                    className="form-control" placeholder="Phone"
                                    inputValue={this.state.addClient.phone} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                        Client nationality :
                            <div className="form-item">
                                <input type="text" name="nationality" 
                                    className="form-control" placeholder="Nationality"
                                    inputValue={this.state.addClient.nationality} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <label>
                        Client birthdate :
                            <div className="form-item">
                                <input type="text" name="birthDate" 
                                    className="form-control" placeholder="BirthDate"
                                    inputValue={this.state.addClient.birthdate} onChange={this.handleInputChange} required/>
                            </div>
                        </label>
                        <div className="form-item">
                            <button type="submit" data-test="add-client" className="btn btn-block btn-primary">
                                Add Client
                            </button>
                        </div>
                    </form>  
                </div>
                </div>
            </div>
        </div>

        <hr></hr>

                <table className = "table table-striped" data-test="data-table">
                    <thead>
                        <tr>
                            <td> Client Id </td>
                            <td> Client First Name </td>
                            <td> Client Last Name </td>
                            <td> Client Phone</td>
                            <td> Client Nationality </td>
                            <td> Client Birth Date </td>
                            <td> More details </td>
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
                                    <td><button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" data-test="see-details" onClick={()=>this.getClient(client.id)}>See</button></td>
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
                            <h5> Bookings :</h5>
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