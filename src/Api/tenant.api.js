import { authHeader } from '../context/helpers/auth-header'
import { configData } from '../config/config.helper'
import axios from 'axios';
import { toaster } from '../config/helpers/toaster';

export const getTenantDetails = async (data) => {
    try{
        var authToken = await authHeader();
        var CurrentToken = authToken.currentToken
        var url=configData.API_URL +"tenants?"+"&sortOrder=" +data.sort+"&limit="+data.value;
        const apiRequest = axios.get(url, {
            headers: { Authorization: `Bearer ${CurrentToken}` }
        });
          return apiRequest
          .then(response => {
              var response_data=response.data   
              return response_data;
          });
    }
    catch{
        toaster("something Went Wrong",2000,"error")
    }
}