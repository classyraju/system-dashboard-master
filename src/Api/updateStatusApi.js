import { authHeader } from "../context/helpers/auth-header";
import { configData } from "../config/config.helper";
import axios from "axios";
import { toaster } from "../config/helpers/toaster";

export const UpdateStatusApi = async (data) => {
    try {
        var authToken = await authHeader();
        var CurrentToken = authToken.currentToken;
        const apiRequest =  axios.put(configData.API_URL + "tenants/updateStatus", data, {
            headers: { Authorization: `Bearer ${CurrentToken}` },
          })
          return apiRequest.then((response) => {
            var response_data = response;
            return response_data;
          });
    }
    catch(error) {
        console.log(error,"Error in UpdateStatusApi block api");
        toaster("Something Went Wrong",2000,"error")
      }
}