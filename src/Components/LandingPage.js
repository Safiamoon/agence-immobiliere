import React from 'react';
import {Link} from "react-router-dom";
import firstImage from '../Images/9.jpg';
import * as CONSTANTS from "../constants";
import Navbar from '../Navbar';

export const LandingPage = () => {
    return (
        <>
        <Navbar />
            <div className="row p-0" style={{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),url('${firstImage}')`, backgroundRepeat:"no-repeat", minHeight:"92vh"}}>
                <div className="col-md-12 d-flex flex-column justify-content-center align-items-center text-dark font-weight-bold">
                    <h1 className="d-none d-lg-inline-flex">Colocation prête à vivre</h1>
                        <div className="btn-group d-inline mt-5">
                            <Link className="nav-link  btn btn-outline btn-lg mb1 silver font-weight-bold d-inline mx-4 text-white" to={CONSTANTS.APPARTEMENTS}>DECOUVREZ NOS APPARTEMENTS</Link>
                        </div>
                </div>
            </div>
        </>
    )
}