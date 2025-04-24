import axios from 'axios';

const callApi = async (url,method = "GET",options) =>{
  try{
    const response = await axios({
        url,
        method,
        data:options.data || null,
        params:options.params || null,
        headers:{
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`
        }
      })
    return response;
  } catch(error){
    console.log(error);
    return error.response;
  }
}

export default callApi;