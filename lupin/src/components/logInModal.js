import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";
const ModalLoginIn = (props) => {
  const {buttonLabel, className} = props;
    
   
  
    const [login, setlogin] = useState("block");
    const [roles, setroles] = useState("none");
    const [join, setjoin] = useState("none");
    const [rolechoosed, setrolechoosed] = useState("");
    const [modal, setModal] = useState(false);
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [tax,setTax] = useState("")
    const [taxhidden,setTaxhidden] = useState("none")
    const [address,setAddress] = useState("")
    const [admin,setAdmin] = useState(false)
    const [salerAccount, setSalerAccount] = useState("")

    console.log(admin);
    const toggle = () => setModal(!modal);
    function Login() {
            setroles("none");
            setjoin("none")
            setlogin("block")
    }
        function Join() {
            setroles("block");
            setjoin("none")
            setlogin("none")
    }
    function Roles(role) {
            setroles("none");
            setjoin("block")
            setlogin("none")
            setrolechoosed(role)
            if (role==="saler") {
              setTaxhidden("block")
              setSalerAccount("starter")
            }
            else {
              setTaxhidden("none")
            }
            console.log(role);
    }
 function register() {
            let user = {
            "name" : name,
            "email": email,
            "password": password,
            "phone": phone,
            "address": address,
            "role": rolechoosed,
            "identiteFiscale":tax,
            "accountType": salerAccount
        }
    console.log(user);
    axios.post('http://localhost:2121/register',user)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
  }
  function Loginn() {
            let user = {
            "email": email,
            "password": password,
        }
      console.log(user);
    if(admin===true) 
    axios.post('http://localhost:2121/admin/login',user)
    .then(function (response) {
    console.log(response);
    localStorage.setItem('token', response.data.token);
    }).catch(function (error) {
    // handle error
    console.log(error);
    })
    else 
    axios.post('http://localhost:2121/login',user)
    .then(function (response) {
    console.log(response);
    localStorage.setItem('token', response.data.token);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
  }
  return (
    <div>
      <Button color="primary" onClick={toggle}>{buttonLabel} Login / Join</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Login/Join</ModalHeader>
        <ModalBody>
        <div>
         <Button color="primary" className="loginbutton" onClick={ Login} > Login</Button>
         <Button color="secondary" className="loginbutton" onClick={ Join} > Join</Button>
         </div>
         {/* ----- login form ------ */}
         {/* onSubmit={Loginn} */}
         <Form style={{ display: login }} onSubmit= {Loginn} >  
         <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="Admin">
            <Form.Check type="checkbox" label="Admin" onChange={(e)=>setAdmin(e.target.checked)}/>
        </Form.Group>
        <Button variant="primary" type="submit" onClick= {Loginn} >
            Login
        </Button>
        </Form>  
        {/* ------------- join form --------- */}
                 <Form style={{ display: join }} onSubmit= {register} >  
        <Form.Group controlId="formBasicFullname">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Full Name" value={name} onChange={(e)=>setName(e.target.value)} />
                          
        </Form.Group>
         <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formConfirmationPassword">
          <Form.Label>Confirmation Password</Form.Label>
          <Form.Control type="password" placeholder="Password Confirmation" />
        </Form.Group>
        <Form.Group controlId="address">
            <Form.Label>address</Form.Label>
            <Form.Control type="text" placeholder="address" value={address} onChange={(e)=>setAddress(e.target.value)}  />
        </Form.Group>
        <Form.Group controlId="phone">
            <Form.Label>phone</Form.Label>
            <Form.Control type="text" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)}  />
        </Form.Group>
         <Form.Group controlId="taxIdentification">
            <Form.Label style={{display:taxhidden}} >Tax identification</Form.Label>
            <Form.Control style={{display:taxhidden}} type="text" placeholder="Tax identification" value={tax} onChange={(e)=>setTax(e.target.value)}  />
        </Form.Group>
        <Button variant="primary" type="submit" >
            Register
        </Button>
        </Form> 
        {/* ----------- roles -------------- */}
        <div style={{ display: roles, width: "90%", marginTop: "35px", marginLeft: "30px"}}> 
            <img src="../../clients.svg" style={{ width: "40%" }} alt="client" onClick={ e => {Roles("client")}} /> 
            <img src="../../sales-agent.svg" style={{ width: "40%", float: "right" }} alt="saler" onClick={ e => {Roles("saler")}} /> <br/> 
        </div> 
</ModalBody>
      </Modal>
    </div>
  );
}

export {ModalLoginIn};