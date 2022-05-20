
import axios from "axios";
import { configData } from "../config/config.helper";
import { toaster } from "../config/helpers/toaster";
import { authHeader } from "../context/helpers/auth-header";

export const getInvoiceApi = async (domain,param) => {
  try {
    var authToken = await authHeader();
    var CurrentToken = authToken.currentToken;
      const apiRequest = axios.get(configData.API_URL + "subscriptions/get-subscription-invoices?subdomains="+domain+"&tenantInvoiceId="+param, {
        headers: { Authorization: `Bearer ${CurrentToken}` },
      });
      return apiRequest.then((response) => {
        var response_data = response.data;
        return response_data;
      });
  } catch {
    toaster("Something Went Wrong",2000,"error")
  }
};
