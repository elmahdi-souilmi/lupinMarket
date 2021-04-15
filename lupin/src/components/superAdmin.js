import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Container, Row, Col, Card } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";
const SuperAdmin = () => {
    const [fullname,setFullname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")

    const [startdate,setStartdate] = useState("")
    const [enddate,setEnddate] = useState("")
    const [description,setDescription] = useState("")
    const [image,setImage] = useState("")

    const [admins,setAdmins] = useState("")
     const [salers,setSalers] = useState("")
    // const [address,setAddress] = useState("")

    const [addadmin, setAddadmin] = useState("none");
    const [deleteadmin, setDeletadmin] = useState("inline-table");
    const [verify, setverify] = useState("none");
    const [loverads, setLoverads] = useState("none");

    useEffect(() => {  
      axios.get('http://localhost:2121/admin/all')
            .then(function (response) {
                console.log(response);
                setAdmins(response.data)
                })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
      axios.get('http://localhost:2121/wantToBeSeller')
            .then(function (response) {
               console.log(response);
                setSalers(response.data)
                })
            .catch(function (error) {
                // handle error
                console.log(error);
                })
    }, [])

    async  function  AddAdmin() {
                  let Admin = {
            "fullname" : fullname,
            "email": email,
            "password": password,
            "phone": phone,
             }
         console.log(Admin);
    await axios.post('http://localhost:2121/admin/add',Admin)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    }

    function deleteAdmin(id) {
      axios.delete( `http://localhost:2121/admin/deleteAdmin/${id}`)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
      
    }
        function verifysaler(id) {
      axios.put( `http://localhost:2121/becomeSeller/${id}`)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
      
    }
    function  AddAds() {
       let Ads = {
            "startdate" : startdate,
            "enddate": enddate,
            "description": description,
            "image": image,
             }
      axios.post('http://localhost:2121/admin/addads',Ads)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
    }

        function fAddAdmin() {
            setAddadmin("block")
            setDeletadmin("none")
            setverify("none")
            setLoverads("none")
    }
            function fdeleteAdmin() {
            setAddadmin("none")
            setDeletadmin("inline-table")
            setverify("none")
            setLoverads("none")
    }
            function fverify() {
            setAddadmin("none")
            setDeletadmin("none")
            setverify("inline-table")
            setLoverads("none")
    }
            function floverads() {
            setAddadmin("none")
            setDeletadmin("none")
            setverify("none")
            setLoverads("block")
    }
    return (

<Container>
{/* --------------Buttons------------------ */}
<Row style={{height:"150px"}} > <h1 style={ {marginLeft:"auto", marginRight:"auto", paddingTop:"60px"}} >  Benjamin Ferel Corner  </h1> </Row>
  <Row>
    <Col><Button style={{width:"80%"}} variant="secondary"  onClick={fAddAdmin}>Ajouter Admin</Button>{' '}</Col>
    <Col><Button style={{width:"80%"}} variant="secondary" onClick={fdeleteAdmin} >delete admin </Button>{' '}</Col>
    <Col><Button style={{width:"90%", marginBottom:"30%"}} variant="secondary" onClick={fverify}>vérifie l’identité fiscale</Button>{' '} </Col>
    <Col><Button style={{width:"80%"}} variant="secondary" onClick={floverads}>signe des contrats </Button>{' '}</Col>
    
  </Row>
  <Row> 
  {/* --------------------table admins--------------------  */}
        <table class="table" style={{display:deleteadmin}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Full name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone number</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
  {console.log(admins)}
  { 
      admins && admins.map((admin, index) =>( 
      <tr>
        <th scope="row">{index+1}</th>
        <td> {admin.fullname} </td>
        <td> {admin.email} </td>
        <td> {admin.phone} </td>
        <td><Button variant="danger"  onClick={e =>deleteAdmin(admin._id)} >Delete</Button> </td>
      </tr>
      ))
  }
  </tbody>
</table>
{/* -------------table saller----------------  */}
        <table class="table" style={{display:verify}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Full name</th>
      <th scope="col">Email</th>
      <th scope="col">identite Fiscale</th>
      <th scope="col">verify</th>
    </tr>
  </thead>
  <tbody>
  { 
      salers && salers.map((saler, index) =>( 
      <tr>
        <th scope="row">{index+1}</th>
        <td> {saler.name} </td>
        <td> {saler.email} </td>
        <td> {saler.identiteFiscale} </td>
        <td><Button variant="danger"  onClick={e =>verifysaler(saler._id)} >verify</Button> </td>
      </tr>
      ))
  }

  </tbody>
</table>
 {/* --------------add admin------------------  */}
<Form onSubmit={AddAdmin} style={{marginLeft:"auto", marginRight:"auto","display":addadmin}}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="name" placeholder="Full name" value={fullname} onChange={(e)=>setFullname(e.target.value)} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="name" placeholder="exemple@exemple.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formGridPhone">
    <Form.Label>phone</Form.Label>
    <Form.Control placeholder="+212********" value={phone} onChange={(e)=>setPhone(e.target.value)} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  </Row>
  {/* --------------------add ads----------------------- */}
  <Form onSubmit={AddAds} style={{marginLeft:"auto", marginRight:"auto",display:loverads}}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label> Begin Date : </Form.Label>
      <Form.Control type="date" value={startdate} onChange={(e)=>setStartdate(e.target.value)} />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>End Date :</Form.Label>
      <Form.Control type="date" value={enddate} onChange={(e)=>setEnddate(e.target.value)} />
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridPicture">
    <Form.Label>picture</Form.Label>
    <Form.Control placeholder="picture link" value={image} onChange={(e)=>setImage(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formGridDescription">
    <Form.Label>description</Form.Label>
    <Form.Control placeholder="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Container>

    );
}
export {SuperAdmin};