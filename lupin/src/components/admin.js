import {React, useState, useEffect} from 'react';
import { Button, Modal, Container, Row, Col, Card } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";
const Admin = () => {
    const [manageUsers, setManageUsers] = useState("none");
    const [manageCommands, setManageCommands] = useState("inline-table");
    const [manageDelivery, setManageDelivery] = useState("none");
    const [manageAds, setManageAds] = useState("none");
    const [addDelivery, setAddDelivery] = useState("none");

  //   delivery info 
        const [fullname, setFullname] = useState("")
        const [email, setEmail] = useState("")
        const [adresse, setAdresse] = useState("")
        const [phone, setPhone] = useState("")

    const [users, setUsers] = useState("");
    const [commands, setCommands] = useState("");
    const [deliverymen, setDeliverymen] = useState("");
    const [ads , setAds] = useState("")


        useEffect(() => {  
      axios.get('http://localhost:2121/Allusers')
            .then(function (response) {
                console.log(response.data);
                setUsers(response.data)
                })
            .catch(function (error) {
            // handle error
            console.log(error);
            })

      axios.get('http://localhost:2121/admin/Deliverymen')
                .then(function (response) {
                  console.log(response.data);
                  setDeliverymen(response.data)
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })

      axios.get('http://localhost:2121/admin/commands')
              .then(function (response) {
                console.log(response.data);
                setCommands(response.data)
              })
              .catch(function (error) {
                // handle error
                console.log(error);
              })

       axios.get('http://localhost:2121/admin/allAds')
                .then(function (response) {
                  console.log(response.data);
                  setAds(response.data)
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })          
    }, [])

function ActivateUser(id) {
          axios.put( `http://localhost:2121/inSuspendUser/${id}`)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
}
function SuspendUser(id) {
          axios.put( `http://localhost:2121/suspendUser/${id}`)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
}
function DeleteUser(id) {
          axios.delete( `http://localhost:2121/deleteUser/${id}`)
    .then(function (response) {
    console.log(response);
    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })
}

 function verifyAdmin(id) {
      console.log(id);
      axios.put(`http://localhost:2121/admin/validateCommand/${id}`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

    }

        async function AddDelivery() {
          let delivery = {
            "full_name": fullname,
            "email": email,
            "address": adresse,
            "phone": phone,
          }
          console.log(delivery);
          console.debug(delivery)
          await axios.post('http://localhost:2121/admin/addDelivery', delivery)
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
        }
            function deletedeliveryman(id) {
              axios.delete(`http://localhost:2121/admin/deleteDelivery/${id}`)
                .then(function (response) {
                  console.log(response);
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })

            }
            function hideAds(id){ 
               axios.put(`http://localhost:2121/admin/hideAds/${id}`)
                 .then(function (response) {
                   console.log(response);
                 })
                 .catch(function (error) {
                   // handle error
                   console.log(error);
                 })

            }
            function showAds(id){
               axios.put(`http://localhost:2121/admin/showAds/${id}`)
                 .then(function (response) {
                   console.log(response);
                 })
                 .catch(function (error) {
                   // handle error
                   console.log(error);
                 })
            }
            function FaddDelivery() {
            setAddDelivery("inline-table")
            setManageUsers("none")
            setManageCommands("none")
            setManageDelivery("none")
            setManageAds("none")
                    }

            function FmanageUsers() {
            setAddDelivery("none")
            setManageUsers("inline-table")
            setManageCommands("none")
            setManageDelivery("none")
            setManageAds("none")
                    }

            function FmanageCommands() {
            setAddDelivery("none")
            setManageUsers("none")
            setManageCommands("inline-table")
            setManageDelivery("none")
            setManageAds("none")
                 }

            function FmanageDelivery() {
            setAddDelivery("none")
            setManageUsers("none")
            setManageCommands("none")
            setManageDelivery("inline-table")
            setManageAds("none")
                }

            function FmanageAds() {
            setAddDelivery("none")
            setManageUsers("none")
            setManageCommands("none")
            setManageDelivery("none")
            setManageAds("inline-table")
                 }
    return (

<Container>
{console.log(manageUsers + "  " + manageCommands + "  " + manageDelivery + "  " + manageAds)}
{/* --------------Buttons------------------ */}
<Row style={{height:"150px"}} > <h1 style={ {marginLeft:"auto", marginRight:"auto", paddingTop:"60px"}} > The Admin Corner   </h1> </Row>
  <Row>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FmanageUsers} >manage users</Button>{' '}</Col>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FmanageCommands} >manage commands</Button>{' '}</Col>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FaddDelivery} > add delivery</Button>{' '}</Col>
    <Col><Button style={{width:"90%", marginBottom:"30%"}} variant="secondary" onClick={FmanageDelivery} >manage delivery</Button>{' '} </Col>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FmanageAds}>manage ads</Button>{' '}</Col>
    
  </Row>
  <Row> 
  {/* --------------------table user--------------------  */}
        <table class="table" style={{display:manageUsers}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Full name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone number</th>
      <th scope="col">Role</th>
      <th scope="col">activate</th>
      <th scope="col">suspend</th>
    </tr>
  </thead>
  <tbody>
 { 
      users && users.map((user, index) =>( 
      <tr>
        <th scope="row">{index+1}</th>
        <td> {user.name} </td>
        <td> {user.email} </td>
        <td> {user.phone} </td>
        <td> {user.role} </td>
       {
        user.suspend ? 
        (<td> <Button variant="danger" onClick={e =>ActivateUser(user._id)}>active</Button> </td>)
        :
        (<td> <Button variant="danger" onClick={e =>SuspendUser(user._id)}>suspend</Button> </td>)
       }
        <td><Button variant="danger" onClick={e =>DeleteUser(user._id)}>delete</Button> </td>
      </tr>))
 }
    
  </tbody>
</table>
{/* -------------table commands ----------------  */}

        <table class="table" style={{display:manageCommands}} >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">saler name</th>
      <th scope="col">products</th>
      <th scope="col">verify</th>
    </tr>
  </thead>
  <tbody>
{
  commands && commands.map((command, index) => (
      <tr>
        <th scope="row"> { index+1 }</th>
        <td> {command.client.name} </td>
        <td> {command.product.label} </td>
        <td><Button variant="success" onClick={e =>verifyAdmin(command._id)}>verify</Button> </td>
      </tr>
  ))
}


  </tbody>
</table>
{/* -------------- ADD Delivery ------------------  */}

  <Form onSubmit={AddDelivery} style={{display:addDelivery, marginLeft:"auto", marginRight:"auto", width:"80%"}}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridName">
      <Form.Label> Name : </Form.Label>
      <Form.Control type="text" value={fullname} onChange={(e)=>setFullname(e.target.value)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email : </Form.Label>
      <Form.Control type="email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridPhone">
    <Form.Label>Phone :</Form.Label>
    <Form.Control type="phone" placeholder="+212...." value={phone} onChange={(e)=>setPhone(e.target.value)} />
  </Form.Group>

  <Form.Group controlId="formGridAdresse">
    <Form.Label>Adresse :</Form.Label>
    <Form.Control type="text" placeholder="adresse" value={adresse} onChange={(e)=>setAdresse(e.target.value)}/>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>

 {/* -------------- manage Delivery ------------------  */}
{/* <Form style={{display:manageDelivery, width:"100%"}}> */}

          <table class="table" style={{display:manageDelivery}} >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Full name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone </th>
      <th scope="col">Address </th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
 {
   deliverymen && deliverymen.map((deliveryman, index) => (
      <tr>
        <th scope="row">{index+1}</th>
        <td> {deliveryman.full_name} </td>
        <td> {deliveryman.email} </td>
        <td> {deliveryman.phone} </td>
        <td> {deliveryman.address} </td>
        
        <td><Button variant="success" onClick={e =>deletedeliveryman(deliveryman._id)} >delete</Button> </td>
      </tr>
   ))
   }

  </tbody>
</table>
  {/* --------------------manage  ads----------------------- */}
  {/* <Form style={{display:, marginLeft:"auto", marginRight:"auto", width:"80%"}}> */}
          <table class="table" style={{display:manageAds}} >
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Started date</th>
      <th scope="col">End date </th>
      <th scope="col">description </th>
      <th scope="col">image </th>
      <th scope="col">shown </th>
    </tr>
  </thead>
  <tbody>
 {
   ads && ads.map((ad, index) => (
      <tr>
        <th scope="row">{index+1}</th>
        <td> {ad.startdate}  </td>
        <td> {ad.enddate} </td>
        <td> {ad.description}  </td>
        <td> {ad.image}  </td>
               {
        ad.showen ? 
        (<td> <Button variant="danger" onClick={e =>hideAds(ad._id)}>hide</Button> </td>)
        :
        (<td> <Button variant="danger" onClick={e =>showAds(ad._id)}>show</Button> </td>)
       }
        {/* <td><Button variant="danger" >verify</Button> </td> */}
      </tr>))
 }
  </tbody>
</table>
</Row>
</Container>
    );
}
export {Admin};