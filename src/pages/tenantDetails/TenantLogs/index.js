
import React, { Component } from "react";
import { TenantLoggerApi } from './Api/tenantLoggerApi';
import Switch from '@material-ui/core/Switch';
import AddBox from '@material-ui/icons/AddBox';
import MaterialTable from 'material-table';
import moment from 'moment';
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
import Box from '@material-ui/core/Box';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { forwardRef } from 'react';
import { CsvBuilder } from 'filefy';
import { axios } from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TenantAllLoggerApi } from "./Api/tenantAllLoggerApi";
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
class TenantLogs extends Component {
    constructor(props){
        super(props)
        this.state = {
             tenantLoggerData : [],
             tenantAllLoggerData:[],
        }
    }

    TenantLogGetApi = async() => {
        try{
            var param ={id:this.props.tenantData.id,limit:100}
            const response = await TenantLoggerApi(param)
           return this.TenantLoggerData(response.data)
        }
   
      catch(err){
          console.log(err)

      }
    }

    TenantLoggerData = (data) => {
        for(var i=0;i<data.length;i++){
            var logData = data[i];
            var tenantLoggerhost = data[i].log_data.host;
            var tenantHttpVersion=data[i].log_data.http_version;
            var tenantReferrer=data[i].log_data.referrer
            logData['tenantLoggerhost'] = tenantLoggerhost;
            logData['tenantHttpVersion'] = tenantHttpVersion;
            logData['tenantReferrer'] = tenantReferrer;
        }
        return data
        }
    handlPage = (page,pageSize) =>{
    }
    handlPageRowChange = (event) =>{
    }
    handleExportChange = () =>{
        var param = {
            id:this.props.tenantData.id,
            getAllLogger:true
        }
        return TenantAllLoggerApi(param)
    }
    render(){
        return(
            <div className="material-table-features material-url-features pb-15">
                                    <MaterialTable
                                    icons={tableIcons}
                                    columns={
                                        [
                                            {
                                                field: 'created_at',
                                                title: 'Created',
                                                render: rowData=> <div>{moment(rowData.created_at).format('ddd, MMM D, YYYY hh:mm')} </div>

                                            },
                                            {
                                                title: 'Method',
                                                field: 'method',
                                        
                                            },
                                            {
                                                title: 'Status Code',
                                                field: 'status_code',
                                        
                                            },
                                            {
                                                title: 'Remote Address',
                                                field: 'remote_address',
                                                
                                            },
                                    
                                            {
                                                title: 'Response Time',
                                                field: 'response_time_ms',
                                        
                                            },
                                            {
                                                title: 'Url',
                                                field: 'url',
                                            },
                                            {
                                                title: 'Host',
                                                field: 'tenantLoggerhost',
                                            },
                                            {
                                                title: 'Referrer',
                                                field: 'tenantReferrer',
                                            },
                                            {
                                                title: 'Http Version',
                                                field: 'tenantHttpVersion',
                                            },
                                            
                                            
                                
                                        ]
                                    }
                                    data={query =>
                                        new Promise((resolve, reject) => {
                                            const param={id:this.props.tenantData.id,per_page:query.pageSize,page:Number(query.page)+1}
                                             TenantLoggerApi(param)
                                            .then(result => {
                                              resolve({
                                                data: this.TenantLoggerData(result.data.data),
                                                page: Number(result.data.page)-1,
                                                totalCount: Number(result.data.count),
                                              })
                                            })
                                        })
                                    
                                      }
                                    options={{
                                        // pageSizeOptions: [5, 10, 20, { value: this.state.tenantLoggerData.length, label: 'All' }],
                                        exportFileName:'Tenant Details',
                                        exportButton: true,
                                        showTitle:false,
                                        pageSize:10,
                                        search: false,
                                        searchFieldVariant:'standard',
                                        exportCsv: (data, columns) => {
                                             this.handleExportChange().then((response) => {
                                            if(response){
                                              for(var i=0;i<response.length;i++){
                                              var logData = response[i];
                                              var tenantLoggerhost = response[i].log_data.host;
                                              var tenantHttpVersion=response[i].log_data.http_version;
                                              var tenantReferrer=response[i].log_data.referrer
                                              logData['tenantLoggerhost'] = tenantLoggerhost;
                                              logData['tenantHttpVersion'] = tenantHttpVersion;
                                              logData['tenantReferrer'] = tenantReferrer;
                                              }
                                            }
                                            const columnTitles = data
                                                .map(columnDef => columnDef.title);
                                            
                                            const csvData = response.map(rowData =>
                                                data.map(columnDef => rowData[columnDef.field]),
                                                );
                                          
                                            const builder = new CsvBuilder(`data.csv`)
                                                  .setColumns(columnTitles)
                                                  .addRows(csvData)
                                                  .exportFile();
                                          
                                            return builder;
                                        })    
                                          },
                                          exportPdf: (data, columns) => {
                                            const doc = new jsPDF();
                                            this.handleExportChange().then((response) => {
                                                if(response){
                                                  for(var i=0;i<response.length;i++){
                                                  var logData = response[i];
                                                  var tenantLoggerhost = response[i].log_data.host;
                                                  var tenantHttpVersion=response[i].log_data.http_version;
                                                  var tenantReferrer=response[i].log_data.referrer
                                                  logData['tenantLoggerhost'] = tenantLoggerhost;
                                                  logData['tenantHttpVersion'] = tenantHttpVersion;
                                                  logData['tenantReferrer'] = tenantReferrer;
                                                  }
                                                }
                                                const columnTitles = data
                                                .map(columnDef => columnDef.title);
                                            
                                            const pdfData = response.map(rowData =>
                                                data.map(columnDef => rowData[columnDef.field]),
                                                );
                                          
                                            doc.autoTable({
                                               head: [columnTitles],
                                               body: pdfData,
                                            });
                                          
                                            doc.save(`data.pdf`);
                                            })
                                         
                                          }
                                    }}
                                    
                                />
                          </div>  
        )
    }

}

export default TenantLogs