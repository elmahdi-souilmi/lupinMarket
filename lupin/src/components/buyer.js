import {React, useState, useEffect} from 'react';
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import {
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle,
    Button,
    Container,
     Row,
    Col
} from 'reactstrap';

const Buyer = () => {
    const loggedInId = useContext (AuthContext)
    const [client, setClient] = useState(localStorage.getItem('iduser'));
    const [Products, setProducts] = useState('');
useEffect(() => {
      axios.get('http://localhost:2121/products'
      )
          .then(function (response) {
              setProducts(response.data)
              console.log(response.data);
          })
          .catch(function (error) {
              // handle error
              console.log(error);
          })

}, [])

    return (
        <Container>
    <Row>
       <img style={{marginLeft:'auto', marginRight:'auto', padding:'2%'}}  src="data:image/png;base64,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" /> 
    </Row>
     <Row>
     {
         Products && Products.map((product, index) => (
        <Col lg={4}>    
          <Card className="my-2"  style={{ width: '18rem' }} >
        <CardImg top width="100%" src="https://m.traxnyc.com/files/img345593366033.jpeg" alt="Card image cap" />
        <CardBody>
          <CardTitle tag="h5">{product.label}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">price : {product.price}</CardSubtitle>
                <PayPalButton
        amount={product.price}
        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
       onSuccess={(details, data)  => {
          alert("Transaction completed by " + details.payer.name.given_name);
                 
          // OPTIONAL: Call your server to save the transaction
          return fetch("/paypal-transaction-complete", {
            method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
           
          });
            let commands = {
            "client" : client,
            "product": product._id,

             }
         
            axios.post('http://localhost:2121/addcommand',commands)
          .then(function (response) {
          console.log(response);
          })
          .catch(function (error) {
          // handle error
          console.log(error);
          })
        }}
      />
        </CardBody>
      </Card>
       </Col>))}
         </Row>
   </Container>
  
    );
}
export {Buyer};


