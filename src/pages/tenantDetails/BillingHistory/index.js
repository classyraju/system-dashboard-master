import MaterialTable from 'material-table';
import React, { useEffect ,useState } from 'react';
import { getInvoiceApi } from '../../../Api/getInvoice';
import {BillingHistoryOfTenantColumn} from './helpers/columns';
import {preProcessingSubscriptionTableData} from './helpers/preparingFieldData'
import { MTableBody } from "material-table";
import { Box, TableCell, TableRow } from '@material-ui/core';
import { getFormattedAmount } from '../helper/currencyHelper';


// import SubscriptionBillingHistoryTable from './SubscriptionBillingHistoryTable';
export default function BillingHistory(props) {
 const [invoices,setInvoices] =useState([])
 const [apiFetched,setApiFetched]=useState(true);
 const [total,setTotal]=useState(0)
    useEffect(() => {
        getInvoiceApi(props.tenantData.domain,props.tenantData.id).then(res=>{
          const response =preProcessingSubscriptionTableData(res)
            setInvoices(response)
            setApiFetched(false)
            var sumOfInvoice=0;
            for(var i=0;i<response.length;i++){
              sumOfInvoice=sumOfInvoice+response[i].amount;
            }
            setTotal(sumOfInvoice)
            })
    }, []); // See Note 2
  

    return (

        <MaterialTable
        isLoading={apiFetched}
        columns={BillingHistoryOfTenantColumn()}
        data={invoices}
        components={{
            Body: (props) => (
              <>
                <MTableBody {...props} />
            <TableRow>
            <TableCell colSpan={5} />
            <TableCell  align="left" colSpan={1}> <Box fontWeight="fontWeightBold">Total Amount Paid</Box></TableCell>
            <TableCell align="left"> <Box fontWeight="fontWeightBold"className='color-green'>{getFormattedAmount(total)}</Box></TableCell>
            </TableRow>
                {/* <tr>
                  <td>TOTAL</td>
                  <td>Your data here</td>
                </tr> */}
              </>
            ),
          }}
        options={{
            exportFileName:'Billing Tenant Details',
            exportButton: true,
            showTitle:false,
            pageSize:10,
            search: true,
            searchFieldVariant:'standard',
            maxBodyHeight:'625px',
            minBodyHeight:'625px',
            pageSizeOptions: [5, 10, 20, { value: invoices.length, label: 'All' }],

            // searchFieldStyle:{

            //     padding: "10.5px 0px",
            // }
        }}
        />
    )


}