import React, { Component } from 'react';
import {Link} from 'react-router-dom';


export default class Navbar extends Component{
    render(){ 
        return (
            <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand text-info font-weight-bold" to='/' >COZY ⌂ LIVING</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link text-dark" to='/appartements'>APARTMENTS</Link>
                        <Link className="nav-item nav-link text-dark" to='/clients'>CLIENTS</Link>
                        <Link className="nav-item nav-link text-dark" to='/reservation'>BOOKINGS</Link>
                    </div>
                </div>
            </nav>
            </>
        )
    }
}