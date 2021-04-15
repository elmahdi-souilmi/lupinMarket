import React, { useState } from 'react';
import {ModalLoginIn} from './logInModal'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

const Logoutnavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
function logout() {
    localStorage.clear()
    window.location.reload();
}
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">LUPIN</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

          </Nav>
          
 
          <NavLink >  <input type="button" value="logOut" onClick = {logout} /> </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
}

export  {Logoutnavbar};