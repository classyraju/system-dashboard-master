
import MaterialTable from 'material-table';
import React, {useEffect, useState } from 'react'
import { getTenantUsersDetails } from '../../../Api/tenant.users.api';
import IndividualSideBar from '../../dashboard/IndividualSideBar/individualSideBar';
import { UsersColumns } from './helpers/columns';
import { preProcessingUserTableData } from './helpers/preparingFieldData';

export const TenantUsers = (props) => {
    const [tenantUserDetails, setTenantUserDetails] = useState([]);
    const [apiFetched,setApiFetch]= useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const showDashboard = value => { setShowDetails(false) }
    const handleActionIndividualUser = (value) => {
        setTenantUserDetails(value);
        setShowDetails(true)
    }
    useEffect(() => {
        var param ='?subdomains='+props.tenantData.domain+'&getAllUser=true'
        getTenantUsersDetails(param).then(res => {
            const userData =preProcessingUserTableData(res)
            setTenantUserDetails(userData)
            setApiFetch(false)
        }).catch(err => {
            console.log('err', err.response)
        })
    }, []);
    return (
        <>
         {showDetails ? (
                <>
                 
            <div><IndividualSideBar
            tenantData={tenantUserDetails}
            showDashboard={showDashboard}/></div>
                 
                </>

            ) :
            <MaterialTable
            isLoading={apiFetched}
            columns={UsersColumns()}
            data={tenantUserDetails}
            options={{
                pageSizeOptions: [5, 10, 20, { value: tenantUserDetails.length, label: 'All' }],
                exportFileName:'User Details',
                exportButton: true,
                showTitle:false,
                pageSize:10,
                search: true,
                searchFieldVariant:'standard',
                maxBodyHeight:'625px',
                minBodyHeight:'625px',
                // searchFieldStyle:{

                //     padding: "10.5px 0px",
                // }
            }}
        />
        }
</>
    )



}