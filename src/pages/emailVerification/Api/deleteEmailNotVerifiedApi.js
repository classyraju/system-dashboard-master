import { authHeader } from "../../../context/helpers/auth-header";
import { configData } from "../../../config/config.helper";
import axios from "axios";
import { toaster } from "../../../config/helpers/toaster";

export const DeleteEmailNotVerifiedApi = async (param) => {
    console.log("paramDetele",param)
  try {
    var authToken = await authHeader();
    var CurrentToken = authToken.currentToken;
    var url = configData.API_URL + "tenants/deleteEmailVerication?" + param;
    const apiRequest = axios.delete(url, {
      headers: { Authorization: `Bearer ${CurrentToken}` },
    });
    return apiRequest.then((response) => {
      var response_data = response.data;
      return response_data;
    });
  } catch {
    console.log("Error in Delete emailNotVerified block api");
    toaster("Something Went Wrong",2000,"error")
  }
};
