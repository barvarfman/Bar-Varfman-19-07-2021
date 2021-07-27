import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { updateUnitType } from "../../actions/WeatherAction.js"
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
            {/* Header logo */}
            <div className="header-left-container flex space-between align-center ">
                <Link to="/">
                    <div className="logo">
                        Weather App
                    </div>
                </Link>
                <button className="unit-type" onClick={() => props.updateUnitType()}>{`°${(props.unitType==="c")?"C":"F"}`}</button>
            </div>
            {/* Main vav links */}
            <nav className={`main-nav ${showNav ? 'drop-nav' : ''}`}>
                <NavLink activeClassName="active" to="/" exact onClick={() => closeNav()}> Home </NavLink>
                <NavLink activeClassName="active" to="/favoritePage" exact onClick={() => closeNav()}> Favorite </NavLink>
            </nav>
            {/* Hamburger button */}
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
    return {
        unitType: state.WeatherReducer.unitType,
    }
}

const mapDispatchToProps = {
    updateUnitType
}

export const HeaderApp = withRouter(connect(mapStateProps, mapDispatchToProps)(_HeaderApp))
