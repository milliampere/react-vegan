import React from 'react';
import logo from '../images/logo.svg';

function Navbar(props){

  return(
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading"><img src={logo} className="logo" alt="Vego" onClick={() => props.pageToView('home')} /></div>
        {props.authenticated && 
          <div>
            <span className="pt-navbar-divider"></span>
            <button className="pt-button pt-minimal pt-icon-add-to-artifact" onClick={() => props.pageToView('add')}>Lägg till recept</button>
            <button className="pt-button pt-minimal pt-icon-bookmark" onClick={() => props.pageToView('favorites')}>Favoriter</button>
          </div>
        }
      </div>
      <div className="pt-navbar-group pt-align-right">
        {props.authenticated
          ?  <div>
        <button className="pt-button pt-minimal pt-icon-user" onClick={() => props.pageToView('profile')}></button>
        <button className="pt-button pt-minimal pt-icon-notifications"></button>
        <button className="pt-button pt-minimal pt-icon-cog"></button>
        <span className="pt-navbar-divider"></span>
         
         </div>
          : null
        }
        
        {props.authenticated &&
        <div style={{margin: "0 1em 0 0.5em"}}>{props.user.email}</div>}

        {props.authenticated
          ? <button onClick={props.signOut} className="pt-button pt-intent-primary">Logga ut</button>
          : <button onClick={() => props.pageToView('login')} className="pt-button pt-intent-primary">Registrera/Logga in</button> 
        }
      </div>

    </nav>

  )}

export default Navbar;




