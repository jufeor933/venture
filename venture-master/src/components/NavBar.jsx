import React from 'react';

import './styles/NavBar.css'
import logo from '../images/logo.svg'
import { Link } from 'react-router-dom'

class NavBar extends React.Component{
    render(){
        return <div className="Navbar">
            <div className="container-fluid">
                <Link className="Navbar__brand" to="/">
                    <img className="Navbar__brand-logo" src={logo} alt=""></img>
                    <span className="font-weight-light">Ticket</span>
                    <span className="font-weight-bold">Verge Ventures</span>
                </Link>
            </div>
        </div>
    }
}

export default NavBar;