import React, { useEffect, useMemo, useState } from 'react'
import { getEmailVerificationDetails } from './Api/getemailverification';
import * as _ from "lodash";
import MaterialTable from 'material-table';
import moment from 'moment';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { toaster } from '../../config/helpers/toaster';
import { DeleteEmailNotVerifiedApi } from './Api/deleteEmailNotVerifiedApi';
import EmailverifiedandNotverifiedChart from './EmailverifiedandNotverifiedChart/emailverifiedandNotverifiedChart';
import { getTenantDetails } from '../../Api/tenant.api';
import { getTableTenantDetails } from '../../Api/getTableTenantDetails';

export const EmailVerification = (props) => {
    const [apiFetch, setApiFetch] = useState(true)
    const [emailVerificationDetails, setEmailVerificationDetails] = useState([]);
    const [tenantDetails,setTenantDetails] = useState([]);
    
    useEffect(() => {
      
        getEmailVerificationDetails().then(res => {
            getTableTenantDetails().then(tenantdata=>{
                const tenantData=tenantdata
                setTenantDetails(tenantData)
                const data = res;
                const sortedArray= _.orderBy(data, 'createdAt', 'desc') 
                console.log("sortedArray",sortedArray)
                setEmailVerificationDetails(sortedArray)
                setApiFetch(false)
            }).catch(err => {
                console.log('err', err.response)
            })
        })
    }, []);

    const handleDelete = (event,data) =>{
        var res=''
        for(var i=0;i<data.length;i++){
            if(data[i].isVerified === false){
                var concatValue =res;
                var res =concatValue.concat("deletedId="+data[i].id+'&');
            }

        }
        var param=res
        if(param===''){
           toaster("Verified email is not deleted",3000,'error')
        }
        else{
            DeleteEmailNotVerifiedApi(param).then((response) => {
                if(response.data){
                    setEmailVerificationDetails(response.data)
                }
                toaster(response.message,3000,'success')
                 });
        }
   
    }
    return (
        <div>
            
            <div className="pb-15">
             <EmailverifiedandNotverifiedChart
                          tenantDetails={tenantDetails}
                          emailVerificationDetails={emailVerificationDetails}
                          />
             </div>
             <div>
             <MaterialTable
                                    isLoading={apiFetch}
                                    columns={[
                                        {
                                            field: 'email',
                                            title: 'Email',
                                    
                                        },
                                        {
                                            title: 'IP Address',
                                            field: 'ipAddress',
                                            render: rowData => <div>{JSON.parse(rowData.ipAddress)}</div>
                                        },
                                        {
                                            title: 'Created',
                                            field: 'createdAt',
                                            render: rowData=> <div>{moment(rowData.createdAt).format('ddd, MMM D, YYYY hh:mm')} </div>
                                        },
                                        {
                                            title: 'Verified',
                                            field: 'isVerified',
                                            render: rowData=> 
                                            <div>
                                                {rowData.isVerified ? <div className="verified-color"><CheckOutlinedIcon/></div> : <div className="not-verified-color"><ClearOutlinedIcon/></div>}
                                            </div>
                                        },
                                        {
                                            title: 'VerifiedAt',
                                            field: 'verifiedAt',
                                            render: rowData=> <div>{rowData.verifiedAt? moment(rowData.verifiedAt).format('ddd, MMM D, YYYY hh:mm'):'-'} </div>
                                        },
                                        {
                                            title: 'VerifyWithin',
                                            field: 'verifyWithin',
                                            render: rowData=> <div>{rowData.verifyWithin?moment(rowData.verifyWithin).format('ddd, MMM D, YYYY hh:mm'):'-'} </div>
                                        },
                                    
                                    ]}
                                    data={emailVerificationDetails}  
                                      
                                    
                                                   
                                    options={{
                                        pageSizeOptions: [5, 10, 20, { value: emailVerificationDetails.length, label: 'All' }],
                                        exportFileName:'Email verification Details',
                                        exportButton: true,
                                        showTitle:false,
                                        pageSize:10,
                                        search: true,
                                        showTextRowsSelected:false,
                                        searchFieldVariant:'standard',
                                        maxBodyHeight:'720px',
                                        minBodyHeight:'720px',
                                        selection: true,
                                        selectionProps: rowData => ({
                                          disabled: rowData.isVerified === true,
                                          color: 'primary'
                                        })
                                    }}
                                    actions={[
                                        {
                                          tooltip: 'Remove All Selected Users',
                                          icon: 'delete',
                                          onClick: (evt, data) => handleDelete(evt, data)
                                        }
                                      ]}
                                        
                                    
                                />
            </div>
           
        </div>
    )
}
