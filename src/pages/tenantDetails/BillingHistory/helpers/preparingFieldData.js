import moment from "moment";
import { getFormattedAmount } from "../../helper/currencyHelper";
  export const preProcessingSubscriptionTableData = (response) => {
    var invoiceData=[]
    for(var i = 0;i<response.length;i++){
      var tempInvoiceData={
        billingStatus:response[i].status,
        email:response[i].stripeInvoice.customer_email,
        paidAt:moment.unix(response[i].stripeInvoice.status_transitions.paid_at).format('YYYY/MM/DD'),
        billCycleStart:moment.unix(response[i].stripeInvoice.lines.data[0].period.start).format('YYYY/MM/DD'),
        billCycleEnd:moment.unix(response[i].stripeInvoice.lines.data[0].period.end).format('YYYY/MM/DD'),
        invoiceUrl:response[i].stripeInvoice.hosted_invoice_url,
        amount:response[i].stripeInvoice.amount_paid,
        // unFormattedAmount:response[i].stripeInvoice.amount_paid
      }
      invoiceData.push(tempInvoiceData)
    }
    return invoiceData;
  }

