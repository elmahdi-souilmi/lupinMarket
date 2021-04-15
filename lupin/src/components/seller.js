import {React, useState, useEffect} from 'react';
import { Button, Container, Row, Col, Card } from 'reactstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const Seller = () => {
        const [manageUsers, setManageUsers] = useState("none");
        const [manageCommands, setManageCommands] = useState("inline-table");
        const [manageDelivery, setManageDelivery] = useState("none");
        const [addDelivery, setAddDelivery] = useState("none");

//   product  info 
const [label, setLabel] = useState("")
const [price, setPrice] = useState("")
const [picture, setPicture] = useState("")
// useEffect data
const [idsaler, setidsaler] = useState("6074b642c530d926fc50382e")
const [products, setProducts] = useState("")
const [salerinfo, setSalerinfo] = useState("")

//const [deliverymen, setDeliverymen] = useState("");
//const [ads, setAds] = useState("")


useEffect(() => {
    axios.get('http://localhost:2121/getProduct/' + idsaler)
        .then(function (response) {
           
            setProducts(response.data)
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    axios.get('http://localhost:2121/user/' + idsaler)
                    .then(function (response) {
                     setSalerinfo(response.data)
                     console.log(response);
                        })
                   .catch(function (error) {
                     // handle error
                     console.log(error);
                                    })

    // axios.get('http://localhost:2121/admin/commands')
    //     .then(function (response) {
    //         console.log(response.data);
    //         //setCommands(response.data)
    //     })
    //     .catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })


}, [])

    function deleteProduct(id) {
        axios.delete(`http://localhost:2121/deleteProduct/${id}`)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }

        async function AddProduct() {
            let Product = {
                "label": label,
                "price": price,
                "picture": picture,
                "idsaler": idsaler
            }
            console.log(Product);
            await axios.post('http://localhost:2121/addproduct', Product)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
   async function upgradeaccount() {
       console.log('lhaaj');
                    await axios.put('http://localhost:2121/upgrade/' + idsaler)
                        .then(function (response) {
                            console.log(response);
                        })
                        .catch(function (error) {
                            // handle error
                            console.log(error);
                        })
        
    }
    
    

                    function FaddProduct() {
                        setAddDelivery("inline-table")
                        setManageUsers("none")
                        setManageCommands("none")
                        setManageDelivery("none")
                        
                    }

                    function FmanageProducts() {
                        setAddDelivery("none")
                        setManageUsers("inline-table")
                        setManageCommands("none")
                        setManageDelivery("none")
                    }

                    function FmanageCommands() {
                        setAddDelivery("none")
                        setManageUsers("none")
                        setManageCommands("inline-table")
                        setManageDelivery("none")
                    }

                    function FupdateAccount() {
                        setAddDelivery("none")
                        setManageUsers("none")
                        setManageCommands("none")
                        setManageDelivery("inline-table")
                    }



    return (
<Container>
{/* {console.log(manageUsers + "  " + manageCommands + "  " + manageDelivery + "  " + manageAds)} */}
{/* --------------Buttons------------------ */}
<Row style={{height:"150px"}} > <h1 style={ {marginLeft:"auto", marginRight:"auto", paddingTop:"60px"}} > bounjour seller   </h1> </Row>
  <Row>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FmanageProducts} >products </Button>{' '}</Col>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FaddProduct} > add product</Button>{' '}</Col>
    <Col><Button style={{width:"90%"}} variant="secondary" onClick={FupdateAccount } > update account subscribtion</Button>{' '}</Col>
    <Col><Button style={{width:"90%", marginBottom:"30%"}} variant="secondary" onClick={ FmanageCommands} >show revenues</Button>{' '} </Col>
  </Row>
  <Row> 
  {/* --------------------table products--------------------  */}
        <table class="table" style={{display:manageUsers}}>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">label</th>
      <th scope="col">price</th>
      <th scope="col">delete</th>
    </tr>
  </thead>
  <tbody>
 {
     products && products.map((product, index) => (
      <tr>
        <th scope="row"> {index+1} </th>
        <td> {product.label} </td>
        <td> {product.price} </td>
        <td><Button variant="danger" onClick={e =>deleteProduct(product._id)} >delete</Button> </td>
      </tr>))
 }
    
  </tbody>
</table>
{/* -------------table revenue ----------------  */}

        <table class="table" style={{display:manageCommands}} >
  <thead>
    <tr>

      <th scope="col">number of products</th>
      <th scope="col">revenue</th>
      <th scope="col">products selled</th>
    </tr>
  </thead>
  <tbody>

      <tr>
       
        <td> {salerinfo.productCount}  </td>
        <td> {salerinfo.revenue}  </td>
        <td> {salerinfo.productsales}  </td>
      </tr>
 
  </tbody>
</table>
{/* -------------- ADD product------------------  */}

  <Form onSubmit={AddProduct} style={{display:addDelivery, marginLeft:"auto", marginRight:"auto", width:"80%"}}>
  <Form.Row>
    <Form.Group as={Col} controlId="formGridlabel">
      <Form.Label> label : </Form.Label>
      <Form.Control type="text" value={label} onChange={(e)=>setLabel(e.target.value)}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPrice">
      <Form.Label>Price : </Form.Label>
      <Form.Control type="number"  value={price} onChange={(e)=>setPrice(e.target.value)}/>
    </Form.Group>
  </Form.Row>

  <Form.Group controlId="formGridPicture">
    <Form.Label>Picture :</Form.Label>
    <Form.Control type="file"  value={picture} onChange={(e)=>setPicture(e.target.value)} />
  </Form.Group>

  <Button variant="primary" type="submit"  >
    Submit
  </Button>
</Form>

 {/* -------------- update account subscreption ------------------  */}
{/* <Form style={{display:manageDelivery, width:"100%"}}> */}

          <table class="table" style={{display:manageDelivery}} >
  <thead>
    <tr>
      <th scope="col">Full name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone </th>
      <th scope="col">acount type </th>
      <th scope="col">Upgrade</th>
    </tr>
  </thead>
  <tbody>
 
      <tr>
        <td> {salerinfo.name} </td>
        <td> {salerinfo.email} </td>
        <td> {salerinfo.phone} </td>
        <td> {salerinfo.accountType} </td>
        <td><Button variant="success" onClick={upgradeaccount}>Upgrade</Button> </td>
      </tr>
  </tbody>
 </table>
</Row>
</Container>
    );}
export {Seller};