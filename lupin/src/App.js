
import './App.css';
import axios from "axios";
// import { Nnavbar } from "./components/navbar";
// import { Buyer } from "./components/buyer";
// import { SuperAdmin } from "./components/superAdmin"
// import { Seller } from "./components/seller"
// import { Admin } from "./components/admin"
import { AuthContextProvider } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './router';
axios.defaults.withCredentials = true;
function App() {
  return (

  <AuthContextProvider>
  <Router/> 
  </AuthContextProvider> 

  );
}

export default App;
