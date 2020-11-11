import React from 'react';
import Navbar from '../Navbar';
import ApptServices from '../Services/ApptServices';
import axios from 'axios';

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
            AddApartment: {
                number: "",
                name: "",
                rooms: [] 
            },
            room: {
                number:"",
                area: "",
                price: ""
            },
            rows: [""],
            apartmentRoom:{
                number:"",
                area: "",
                price: "",
                apartmentId: ""
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addRow = this.addRow.bind(this);
        this.handleApptRoomInputChange = this.handleApptRoomInputChange.bind(this);
        this.handleAddRoomSubmit = this.handleAddRoomSubmit.bind(this);
    }

    //Add room 
    handleApptRoomInputChange(event) {
        var roomToAdd = {...this.state.apartmentRoom}
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        roomToAdd[inputName] = inputValue;
        this.setState({
            apartmentRoom : roomToAdd
        });        
    }

    handleRoomChange(event) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        var currentRoom = {...this.state.room};
        currentRoom[inputName] = inputValue;

        this.setState({
            room: currentRoom
        });        
    }

    handleAddRoomSubmit(event) {

        event.preventDefault();
        const json = JSON.stringify(this.state.apartmentRoom);
        console.log(json);
        axios.post("https://app-booking-christ.herokuapp.com/api/room",this.state.apartmentRoom).then( (response) => {
            console.log(response.data);
            window.location.reload(false);  
        });
    }

    addRoomToAppt(id){
        var currentApartmentRoom = {...this.state.apartmentRoom};
        currentApartmentRoom["apartmentId"]=id;
        this.setState({apartmentRoom:currentApartmentRoom });
        console.log(this.state.apartmentRoom);

    }

    //Add apartment
    handleInputChange(event) {
        var apartmentToAdd = {...this.state.AddApartment}
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;
        apartmentToAdd[inputName] = inputValue;
        this.setState({
            AddApartment : apartmentToAdd
        });        
    }

    handleSubmit(event) {

        event.preventDefault();
        const json = JSON.stringify(this.state.AddApartment);
        console.log(json);
        axios.post("https://app-booking-christ.herokuapp.com/api/apartment",this.state.AddApartment).then( (response) => {
            console.log(response.data);
            window.location.reload(false);  
        });
    }

    addRow() {

        var currentApartment = {...this.state.AddApartment};
        var currentApartmentRooms = {...this.state.AddApartment.rooms};
        var currentRoom = {...this.state.room};
        console.log(currentApartment);
        this.state.AddApartment.rooms.push(currentRoom);
        console.log(currentApartment);
        this.state.rows.push("x");
        this.setState({
            AddApartment : currentApartment
        });

    }


    componentDidMount() {
        //Display all api apartments
        ApptServices.getAppartements().then( (response) => {
            this.setState( { apartments: response.data.apartments } )
        });

    }

    //Display current apartment details
    getApartment(id) {
        ApptServices.getCurrentApartmentDetail(id).then( (response) => {
            this.setState({currentApartment : this.state.apartments.filter(item => item.id==id)[0]})
        });
    }


    render(){ 
    return (
        <>

        <Navbar />

        <h1 className = "text-center"> APARTMENTS LIST </h1>

        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Add Apartment</button>
            
            {/* Add apartment modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add new Apartment</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Apartment Name :
                                    <div className="form-item">
                                        <input type="text" name="name" 
                                            className="form-control" placeholder="Name"
                                            inputValue={this.state.AddApartment.name} onChange={this.handleInputChange}/>
                                    </div>
                                </label>
                                <label>
                                Apartment Number :
                                    <div className="form-item">
                                        <input type="text" name="number" 
                                            className="form-control" placeholder="Number"
                                            inputValue={this.state.AddApartment.number} onChange={this.handleInputChange}/>
                                    </div>
                                </label>
                                <label>
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
                                            {this.state.rows.map(row =>
                                            <tr>
                                                <td>
                                                    <div className="form-item">
                                                        <input type="text" name="number" 
                                                            className="form-control" placeholder="Number"
                                                            inputValue={this.state.room.number} onChange={this.handleRoomChange}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-item">
                                                        <input type="text" name="area" 
                                                            className="form-control" placeholder="Area"
                                                            inputValue={this.state.room.area} onChange={this.handleRoomChange}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-item">
                                                        <input type="text" name="price" 
                                                            className="form-control" placeholder="Price"
                                                            inputValue={this.state.room.price} onChange={this.handleRoomChange}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-block btn-primary" onClick={this.addRow} >Add Room</button>
                                                </td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </label>
                                <div className="form-item">
                                    <button type="submit" className="btn btn-block btn-primary">
                                        Add Apartment
                                    </button>
                                </div>
                            </form>  
                        </div>
                    </div>
                </div>
            </div>

        <hr></hr>

        {/* retrieved data from api*/}
        <table className = "table table-striped">
            <thead>
                <tr>
                    <td> Apartment Id </td>
                    <td> Apartment Number </td>
                    <td> Apartment Name </td>
                    <td> More details </td>
                    <td> Add room </td>
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
                        <td><button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter" onClick={()=>this.getApartment(apartment.id)}>See</button></td>
                        <td><button type="button" className="btn btn-success" data-toggle="modal" data-target="#addRoom" data-whatever="@mdo" onClick={()=>this.addRoomToAppt(apartment.id)}>Add Room</button></td>
                    <div className="modal fade" id="addRoom" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add new room</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                <form onSubmit={this.handleAddRoomSubmit}>
                                    <label>
                                    Add room :
                                    <table className = "table table-striped">
                                        <tbody>
                                            <td><div className="form-item">
                                                <input type="text" name="price" 
                                                    className="form-control" placeholder="Price"
                                                    inputValue={this.state.AddApartment.price}
                                                    onChange={this.handleApptRoomInputChange}
                                                    />
                                            </div></td>
                                            <td><div className="form-item">
                                                <input type="text" name="number" 
                                                    className="form-control" placeholder="Number"
                                                    inputValue={this.state.AddApartment.number}
                                                    onChange={this.handleApptRoomInputChange}
                                                    />
                                            </div></td>
                                            <td><div className="form-item">
                                                <input type="text" name="area" 
                                                    className="form-control" placeholder="Area"
                                                    inputValue={this.state.AddApartment.area}
                                                    onChange={this.handleApptRoomInputChange}
                                                    />
                                            </div></td>
                                        </tbody>
                                    </table>
                                    </label>
                                    <div className="form-item">
                                        <button type="submit" className="btn btn-block btn-primary" onClick={this.addRow} >
                                            Add Room
                                        </button>
                                    </div>
                                </form>  
                                </div>
                            </div>
                        </div>
                    </div>
                    </tr>
                    )
                }
            </tbody>
        </table>

        {/* See details modal  */}
        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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