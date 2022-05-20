import React, { useEffect, useMemo, useState } from 'react'
import { getTenantDetails } from '../../Api/tenant.api';
import TenantDetails from '../tenantDetails';
import './dashboard.css'
import MaterialTable from 'material-table';
import { preProcessingTableData } from './helpers/preparingFieldData';
import UserMonthWiseChart from './userMonthWiseChart';
import Switch from '@material-ui/core/Switch';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Backbtn from '../tenantDetails/Backbtn';
import Box from '@material-ui/core/Box';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { forwardRef } from 'react';
import { UpdateStatusApi } from '../../Api/updateStatusApi';
import DeleteDialogBox from '../../config/helpers/DeleteDialogBox/deleteDialogBox';
import PieChartUserSubcriptionBased from './pieChartUserSubcriptionBased';
import CountryBasedMap from './countryBasedMap';
import TodayBasedUserOverView from './todayBasedUserOverView';
import { Avatar, Grid } from "@material-ui/core";
import IndividualUserDetails from './IndividualUserDetails';
import IndividualSideBar from './IndividualSideBar/individualSideBar';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

const customStyles = {
    rows: {
        style: {
            '&:hover': {
                cursor: 'pointer',
                background:'#ebebeb'
            },
        }
    },
};

export const Dashboard = (props) => {
    const [tenantData, setTenantData] = useState({});
    const [apiFetched, setApiFetch] = useState(true)
    const [showDetails, setShowDetails] = useState(false)
    const showDashboard = value => { setShowDetails(false) }
    const [tenantDetails, setTenantDetails] = useState([]);
    const [ isDelete, setisDelete ] = useState(false)
    const [openDeleteDialogBox,setopenDeleteDialogBox] = useState(false)
    const [DeleteTitle,setDeleteTitle] = useState(null);
    const [saveData,setSaveData] = useState(null)
    const [billingData,setBillingData]= useState(null)

    const handleAction = (value) => {
        setTenantData(value);
        setShowDetails(true)
    }

    useEffect(() => {
        var param ={sort:"desc",
                    value:10}
        getTenantDetails(param).then(res => {
            const data = preProcessingTableData(res)
            setTenantDetails(data)
            setApiFetch(false)
        }).catch(err => {
            console.log('err', err.response)
        })
    }, [ ]);

    const handleStatusToggle = (Status,data) => {
        var updateStatus = {
            status:Status?1:0,
            id:data.id
        }
        if(Status){
            UpdateStatusApi(updateStatus).then((response) => {
                processTenantData(response.data,tenantDetails)
             });
        }
        else{
            setopenDeleteDialogBox(true)
            setDeleteTitle({title:"Information Status",name:"Status"})
            setisDelete(false)
            setSaveData(updateStatus)
            setBillingData(null)
        }
 
    }
    const handleBillingNotificationToggle = (billing,data) => {
        var updateBilling = {
            billing_notification:billing?true:false,
            id:data.id
        }
        // if(billing){
        //     UpdateStatusApi(updateBilling).then((response) => {
        //         processTenantData(response.data,tenantDetails)
        //      });
        // }
        // else{
            setopenDeleteDialogBox(true)
            setDeleteTitle({title:"Billing Notification",name:"Billing Notification"})
            setisDelete(false)
            setBillingData(updateBilling)
            setSaveData(null)
        // }
 
    }
    const handleSuccess = () => {
        handleToogle();
     };

    const handleToogle = () =>{

        const data = billingData?billingData:saveData
        UpdateStatusApi(data).then((response) => {
            setopenDeleteDialogBox(false)
            processTenantData(response.data,tenantDetails)
         });
    }

    const processTenantData = (data,tenantData) =>{
        setApiFetch(true)    
        const tenantarray=tenantData
        for(var j=0;j<tenantarray.length;j++){
            if(tenantarray[j].id===data.id){
                tenantarray[j].status=data.status
                tenantarray[j].billing_notification=data.billing_notification
            }
        }
        console.log('tenantarray',tenantarray)
        setTenantDetails(tenantarray) 
        setApiFetch(false)    
   }

  const handleDeleteClose=()=>{
    setopenDeleteDialogBox(false)
  }

    return (
       
        <>

            {showDetails ? (
                <>
                 
            <div><IndividualSideBar
            tenantData={tenantData}
            showDashboard={showDashboard}
            allUser={false}/></div>
                 
                </>

            ) :
            <div>
<div className="material-table-features material-url-features pb-15">
                                    <MaterialTable
                                    icons={tableIcons}
                                    isLoading={apiFetched}
                                    columns={
                                        [
                                            {
                                                field: 'id',
                                                title: '#_Id',
                                        
                                            },
                                            {
                                                field: 'fullname',
                                                title: 'Name',
                                                width: "80%",
                                                render: (rowData) => 
                                                <div className="flex">
    <div className="list-ico-userTable warning avtr-notes-firstletter">
      <Avatar className={rowData.FirstLetter}>
        {rowData.FirstLetter}
      </Avatar>
    </div><div className="usertable-name-padding">{rowData.fullname}</div></div>
                                        
                                            },
                                            {
                                                title: 'Email',
                                                field: 'email',
                                        
                                            },
                                            {
                                                title: 'Country',
                                                field: 'country',
                                                render: (rowData) => (rowData.country) ? rowData.country.name : '-',
                                            },
                                            {
                                                title: 'Features',
                                                field: 'overrides',
                                                render: (rowData) => (rowData.phoneNumber) ? rowData.phoneNumber : '-',
                                        
                                            },
                                            {
                                                title: 'Phone Number',
                                                field: 'phoneNumber',
                                                render: (rowData) => (rowData.phoneNumber) ? rowData.phoneNumber : '-',
                                        
                                            },
                                            {
                                                title: 'Domain',
                                                field: 'domain',
                                            },
                                            {
                                                title: 'Total Users',
                                                field: 'userCount',
                                            },
                                            {
                                                title: 'Folder Size (Mb)',
                                                field: 'folderSize',
                                            },
                                            {
                                                title: 'Current Plan',
                                                field: 'subscription.product.name',
                                                // width:'125px'
                                            },
                                            {
                                                title: 'Payment Status',
                                                field: 'paymentStatus',
                                                // width:'150px'
                                            },
                                            {
                                                title: 'Status',
                                                field: 'status',
                                                disableClick:true,
                                                render: rowData => (
                                                    <Switch
                                                    edge="start"
                                                    className="url-and-app-button-pointer"
                                                    onChange={() => handleStatusToggle(!rowData.status,rowData)}
                                                    checked={rowData.status}
                                                />
                                                ),
                                            },
                                            {
                                                title: 'Billing Notification',
                                                field: 'billing_notification',
                                                disableClick:true,
                                                render: rowData => (
                                                    <Switch
                                                    edge="start"
                                                    className="url-and-app-button-pointer"
                                                    onChange={() => handleBillingNotificationToggle(!rowData.billing_notification,rowData)}
                                                    checked={rowData.billing_notification}
                                                />
                                                ),
                                            },
                                        ]
                                    }
                                    // pagination={true}
                                    data={tenantDetails}
                                    onRowClick={(event,rowData) => {
                                        handleAction(rowData)
                                    }}
                                    // actions={[
                                    //     {
                                    //       icon: VisibilityIcon,
                                    //       tooltip: 'View User',
                                    //       onClick: (event, rowData) => handleAction(rowData)
                                    //     }
                                    //   ]}
                                    options={{
                                        pageSizeOptions: [5, 10, 20, { value: tenantDetails.length, label: 'All' }],
                                        exportFileName:'Tenant Details',
                                        exportButton: true,
                                        showTitle:false,
                                        pageSize:10,
                                        search: true,
                                        searchFieldVariant:'standard',
                                        maxBodyHeight:'720px',
                                        minBodyHeight:'720px',
                                        // searchFieldStyle:{

                                        //     padding: "10.5px 0px",
                                        // }
                                    }}
                                    
                                />
                          </div>    
             <div className="pb-15">
             <UserMonthWiseChart 
                          tenantDetails={tenantDetails}
                          />
             </div>
               
               <div className="pb-15">
                   <Grid className="h-300 desk-100 flex">
                   <Grid item xs={6} className="pr-7">
                   <PieChartUserSubcriptionBased 
                   />
                       </Grid>
                       <Grid item xs={6} className="pl-7">
                   <TodayBasedUserOverView 
                   handleAction={handleAction}
                   tenantDetails={tenantDetails}
                   />
                       </Grid>
                   </Grid>
                   
               </div>
           
               {/* <div className="pb-15">
                   <CountryBasedMap 
                   tenantDetails={tenantDetails}
                   />
               </div> */}
                          
                
                          
                          
                          
                          <DeleteDialogBox 
                    openDeleteDialogBox={openDeleteDialogBox}
                    name={DeleteTitle?DeleteTitle.name:''}
                    handleDeleteClose={handleDeleteClose}
                    handleSuccess={handleSuccess}
                    DeleteTitle={DeleteTitle?DeleteTitle.title:''}
                    />
                          </div> 
                                

            }


        </>
    )
}