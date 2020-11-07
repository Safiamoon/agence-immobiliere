import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import Navbar from '../Navbar';
import ApptServices from '../Services/ApptServices';

class Appartements extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            apartments:[]
        }
    }

    componentDidMount() {

        ApptServices.getAppartements().then( (response) => {
            this.setState( { apartments: response.data.apartments } )
        });

    }
    render(){ 
    return (
        <>
        <Navbar />
        <h1 className = "text-center" > Apartment List </h1>
        <button type="button" class="btn btn-success">Add Apartement</button>
        <hr></hr>
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
                            <td><button type="button" class="btn btn-info">See</button></td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        </>
    )
}
}

export default Appartements;