import { UserContext } from '../UserContext';
import { configData } from '../../config/config.helper';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

export const authHeader = async () => {
    try{
        const currentToken = JSON.parse(localStorage.getItem('currentToken')) 
       if(checkTokenExpiry(currentToken)){
        await refreshToken();
        const currentTokens = JSON.parse(localStorage.getItem('currentToken'))     
        return returnAuthHeader(currentTokens);
     }
     else{
     return returnAuthHeader(currentToken);
     }
    }
    catch{
        UserContext.signOut();
    }
    
}

const returnAuthHeader = (currentToken) => {
    return { 
     currentToken
    };
}


const refreshToken = async () => {
        var refreshToken= JSON.parse(localStorage.getItem("refreshToken"));;
        return axios
        .post(configData.API_URL + "systemUser/refreshtoken", {
          refreshToken
        })
        .then(response => {
          if (response.data) {
            localStorage.setItem("currentToken", JSON.stringify(response.data));
          }
          return response.data;
        }).catch(function (error) {
          console.log(error);
        });
    
}

const checkTokenExpiry = (token) => {
    var decoded = jwt_decode(token);
    var toExpire = decoded.exp * 1000
      
    if (Date.now() > toExpire) {
        return true; //expired
    }
    return false; //not expired
}