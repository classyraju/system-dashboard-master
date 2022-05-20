import React, { Component } from "react";
import { chartColors } from '../../config/helpers/chartColors';
import * as _ from "lodash";
import ReactApexChart from "react-apexcharts";
import { Card,CardContent} from "@material-ui/core";
import { getAllTenantApi } from "../../Api/getAllTenantApi";
import { preProcessingTableData } from "./helpers/preparingFieldData";

class PieChartUserSubcriptionBased extends Component {
    constructor(props) {
        super(props);
        this.state = {
          projectDataTop5: [],
          loading:true,
          isProjectSummaryTop5: false,
          windowWidth: window.innerWidth,
          SelectedThisMonth: false,
          series: [],
          options: {
            chart: {
              animations: {
                enabled: false,
            },
              width: 450,
              type: "donut",
              fontFamily: "inherit",
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    value: {
                      show: true,
                      formatter: function(val) {
                        return val;
                      },
                    },
                    total: {
                      showAlways: true,
                      show: true,
                      formatter: function(w) {
                        var data = [];
                        var total = 0;
                        data = w.globals.seriesTotals;
                        for (var i = 0; i < data.length; i++) {
                          total += data[i];
                        }
                        return total;
                      },
                    },
                  },
                },
              },
            },
            colors:chartColors(),
            labels: [],
            legend: {
              show: true,
              fontFamily: "inherit",
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: { width: 200,},
                  legend: {
                    position: "bottom",
                    fontFamily: "inherit",
                  },
                },
              },
            ],
            dataLabels: {
              enabled: false,
              dropShadow: {
                blur: 3,
                opacity: 0.8,
              },
            },
           
          },
        };
      }

      async componentDidMount() {
        this.getAllTenantDetailsApi();
      }
      getAllTenantDetailsApi = () => {
        var param ={sort:"desc",
        getAllTenant:true}
        getAllTenantApi(param).then(res => {
          const data = preProcessingTableData(res)
          this.pieChartProcess(data)
        })
      }
      pieChartProcess = (data)=>{
          try{
            var userData = data;
            var productName = [];
            var productbasedSubscriptionCount = [];
            var subscriptionDtails =[];
            for(var i=0;i<userData.length;i++){
                if(userData[i].subscription){
                    if(userData[i].subscription.product){
                        subscriptionDtails.push(userData[i].subscription.product)
                    }
                }
            }
            const uniqueArrayWithCounts = subscriptionDtails.reduce((accum, val) => {
                const dupeIndex = accum.findIndex(arrayItem => arrayItem.id === val.id);
                if (dupeIndex === -1) {
                  accum.push({
                    qty: 1,
                    ...val
                  });
                } else {
                  accum[dupeIndex].qty++;
                }
                return accum;
            }, []);

            var sortArray = _.orderBy(uniqueArrayWithCounts, ['id'],['asc']);
            for(var j=0;j<sortArray.length;j++){
                productbasedSubscriptionCount.push(sortArray[j].qty)
                var name=sortArray[j].identifier.toUpperCase()
                productName.push(name)
            }

             if (productbasedSubscriptionCount.length > 0) {
                this.setState((prevState) => {
                  let options = Object.assign({}, prevState.options); 
                  options.labels = productName; 
                  return { options, series: productbasedSubscriptionCount }; 
                });
              }
          }
          catch(error){
            console.log(error)
            this.setState({series:error})
          }
      }

      render(){
          return(
            <Card className="projectPulseCard">
            <CardContent>
            <div className="d-flex">
                <div className="w-70">
                  <h3 className="people-time-tracker-title">{"User OverView"} </h3>
                </div>
              </div>
              {this.state.series.length===0 &&

            <div className="overall-card-padding-idle-time nodata-text top-app-skeleton-padding-top">  
            <span>{"No data Avaliable"}</span>
            </div>
              
              }

  {this.state.series.length!==0 &&
                  <div id="chart" className="chart-textwrap ">
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="donut"
                  height={305}
                />
              </div>
      }
              </CardContent>
              </Card>

          )
      }
}
export default PieChartUserSubcriptionBased