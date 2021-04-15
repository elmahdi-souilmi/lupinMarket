import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Nnavbar } from "./components/navbar";
import { Buyer } from "./components/buyer";
import { SuperAdmin } from "./components/superAdmin"
import { Seller } from "./components/seller"
import { Admin } from "./components/admin"
import { Logoutnavbar } from "./components/logoutnav";
import { Normaluser } from "./components/normaluser";
import { useContext } from "react";
import { AuthContextProvider } from './context/AuthContext';
import AuthContext from "./context/AuthContext";
function Router(){

    const loggedIn = useContext (AuthContext);
    const userLoggedIn = useContext (AuthContextProvider);

    const isLoggedIn = loggedIn.userLoggedIn;

    const role = loggedIn.loggedIn;
    const userRole = loggedIn.userRole;
    

    return (

        <BrowserRouter>
            <Switch>
                 {/* <div> 
                    <Nnavbar> </Nnavbar>            
                    <SuperAdmin />
                      {console.log(isLoggedIn)} 
                      {console.log(userRole)}
                </div> */}





            {/* <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginUser} />
            <Route exact path="/admin" component={Login} />
            <Route exact path="/validateAccount/:token" component={ValidateAccount} />
            <Route exact path="/products/:category" component={ProductsByCategory} />
            <Route exact path="/product/:idProduct" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/checkout" component={Checkout} /> */}
            
            {
               (isLoggedIn === false)  && <>
                <div> 
                    <Nnavbar> </Nnavbar>
                    <Normaluser />
                 </div>
                </>
            }
               
            
            {
                userRole === "client" && <>
                <div> 
                    <Logoutnavbar /> 
                    <Buyer />
               </div>
                </>
            }

            {
                userRole === "saler"  && <>
                <div> 
                    <Logoutnavbar /> 
                     <Seller />
                </div>

                </>
            }
            {
                userRole === "superAdmin"  && <>
                <div> 
                    <Logoutnavbar /> 
                     <SuperAdmin/>
                </div>

                </>
            }
              {
                userRole === "Admin"  && <>
                <div> 
                    <Logoutnavbar /> 
                     <Admin />
                </div>

                </>
            }

            

            </Switch>
        </BrowserRouter>
    )
}

export default Router;