import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = (props) => {

    // const [userLoggedIn , setUserLoggedIn] = useState(undefined);
    // const [userRole , setUserRole] = useState(undefined);
    // const [idUser , setIdUser] = useState(undefined);
    // // --------------admin login context ------------------
    // const [loggedIn , setLoggedIn] = useState(undefined);
    // const [role , setRole] = useState(undefined);

    // async function getLoggedAdminIn(){
    //             let token = localStorage.getItem('token')
    //     const loggedInRes = await axios.get(`http://localhost:2121/admin/loggedIn?token=${token}`);

    //     console.log("*****************");
    //     console.log(loggedInRes.data.loggedIn);
    //     console.log("*****************");

    //     setLoggedIn(loggedInRes.data.loggedIn);
    //     setRole(loggedInRes.data.role);

    // }

    // --------------user login context ------------------


    const [userLoggedIn , setUserLoggedIn] = useState(undefined);
    const [userRole , setUserRole] = useState(undefined);
    const [idUsr , setIdUser] = useState(undefined);
    let iduser
    

    async function getLoggedInUser(){
        let token = localStorage.getItem('token')
        const loggedInUserRes = await axios.get(`http://localhost:2121/loggedInUser?token=${token}`);
        console.log("*****************");
        console.log(token);
        console.log(loggedInUserRes);
        console.log(loggedInUserRes.data.loggedIn);
        console.log(loggedInUserRes.data.role);
        console.log(loggedInUserRes.data.id);
        console.log("*****************");

        setUserLoggedIn(loggedInUserRes.data.loggedIn);
        setUserRole(loggedInUserRes.data.role);
        //setIdUser(loggedInUserRes.data.id)
       localStorage.setItem('iduser',loggedInUserRes.data.id )
    }


    useEffect(()=>{
        // getLoggedAdminIn();
        getLoggedInUser();

    },[])


    return ( 
        <AuthContext.Provider value={{userLoggedIn,userRole,getLoggedInUser,iduser}}>
            {props.children}
        </AuthContext.Provider>
     );
}
 export default AuthContext;
export {
    AuthContextProvider,
};