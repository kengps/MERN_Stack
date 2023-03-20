import axios from "axios";



export const lisetUsers = async (authtoken) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/listuser`,
    
    {
      headers: {
        authtoken,
      },
    }
  );
};

//แก้ไข Status
export const changStatus = async (authtoken, value) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/change-status`, value,

    {
      headers: {
        authtoken,
      },
    }
  );
};

//แก้ไข ระดับ
export const changRole = async (authtoken, value) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/change-role`, value,

    {
      headers: {
        authtoken,
      },
    }
  );
};