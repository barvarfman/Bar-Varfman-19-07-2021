import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import './HeaderApp.scss';

export function _HeaderApp(props) {
    
    const [showNav, setShowNav] = useState(false)

    function toggleNav() {
        setShowNav(!showNav)
    }

    function closeNav() {
        setShowNav(false)
    }

    return (
        <header className="app-header flex space-between align-center">
            <Link className="no-decoration" to="/">
                <div className="logo">
                    Weather App
                </div>
            </Link>
            <nav className={`main-nav ${showNav ? 'drop-nav' : ''}`}>
                <NavLink className="no-decoration" activeClassName="active" to="/" exact onClick={() => closeNav()}> Home </NavLink>
                <NavLink className="no-decoration" activeClassName="active" to="/favoritePage" exact onClick={() => closeNav()}> Favorite </NavLink>
            </nav>
            <button className={`hamburger flex column ${showNav ? 'drop-nav' : ''}`} onClick={() => toggleNav()}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`screen ${showNav ? 'drop-nav' : ''}`} onClick={() => closeNav()}></div>
        </header>
    )
}


function mapStateProps(state) {
    return{
        
    }
}

const mapDispatchToProps = {

}

export const HeaderApp = withRouter(connect(mapStateProps, mapDispatchToProps)(_HeaderApp))
