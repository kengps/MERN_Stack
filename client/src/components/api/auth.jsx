import axios from "axios";

export const currentUser = async(authtoken)  =>{
    console.log('จะมีไหม : ' + authtoken);
 return  await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/current-user`,{},
        {
            headers:{
                authtoken,
            }
        }
      );

}

export const currentAdmin = async(authtoken)  =>{
 return  await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/current-admin`,{},
        {
            headers:{
                authtoken,
            }
        }
      );

}