import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import Spinner from '../spinner'
import SpinnNot from '../spinnNot'
import {Nav, Navbar} from 'react-bootstrap';


const NavGar = ({isDataLoad}) => {
 

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand >
         
          {
            !isDataLoad
            ?
            <Spinner 
            isDataLoad
            className="d-inline-block align-top"/>
            :
            <SpinnNot 
            isDataLoad
            className="d-inline-block align-top"/>
          }
          
        </Navbar.Brand>
        <Nav className="mr-auto">
              <Link to="/" className=" nav-link">
                to Home
              </Link>
        </Nav>
      </Navbar>
    </>
    
   
         
    
  );
};

export default NavGar;
