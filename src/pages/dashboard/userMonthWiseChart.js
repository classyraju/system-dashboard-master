import React, { Component } from "react";
import * as _ from "lodash";
import ReactApexChart from "react-apexcharts";
import { timezoneHelper } from "../../config/helpers/timezone";
import { range } from "@simonja/moment-date-range";
import moment from "moment-timezone";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { Card,CardContent,Button} from "@material-ui/core";
import Loading from '../../config/helpers/Loading';
import './dashboard.css'
import { preProcessingTableData } from "./helpers/preparingFieldData";
import { getAllTenantApi } from "../../Api/getAllTenantApi";

class UserMonthWiseChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weekDays: [],
            loading:true,
            isUserDayWiseData: false,
            SelectedThisMonth: false,
            SelectedLastMonth: false,
            series: [{
                name: "user",
                data: []
            }],
            options: {
              chart: {
                height: 350,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              title: {
                text: 'Day wise user count',
                align: 'left'
              },
              grid: {
                xaxis: {
                  lines: {
                    show: false
                  }
                },
                yaxis: {
                  lines: {
                    show: true
                  }
                }
              },
              xaxis: {
                categories: [],
              }
            },
            };
            this.thisMonth = this.thisMonth.bind(this);
            this.lastMonth = this.lastMonth.bind(this);
    }

    async componentDidMount() {
        this.thisMonth();
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.tenantDetails !== this.props.tenantDetails) {
            this.thisMonth();
        }
      }
      getAllTenantDetailsApi = () => {
        var param ={sort:"desc",
        getAllTenant:true}
        getAllTenantApi(param).then(res => {
          const data = preProcessingTableData(res)
          this.UserDayWiseProcess(data)
        })
      }
      UserDayWiseProcess = (data) =>{
          if(data){
            var userReport = data;
            var WeekData = this.state.weekDays;
            for (var i=0;i<userReport.length;i++){
                var userData=userReport[i];
                var dateFormating = moment(userReport[i].createdAt).format('YYYY-MM-DD')
                userData['dateFormating']=dateFormating
            }
            var array=[];
            for(var j=0;j<userReport.length;j++){
                for(var k=0;k<WeekData.length;k++){
                    if(userReport[j].dateFormating===WeekData[k]){
                        array.push(userReport[j])
                    }
                }
            }

            var dataList = [];
            var finalData = [];
                var dataList = [];
                var tempUserDataList = [];
                dataList = array;
                _.forEach(WeekData, function(WeekDay) {
                    var foundUser = _.filter(dataList, person => person.dateFormating === WeekDay)
                    var tmp = {};
                    if (foundUser.length>0) {
                      tmp = {
                        hoursTracked: foundUser.length,
                      };
                    } else {
                      tmp = {
                        hoursTracked: 0,
                      };
                    }
                    tempUserDataList.push(tmp);
                  });
                  var hours = [];
                for (var j = 0; j < tempUserDataList.length; j++) {
                    hours.push(tempUserDataList[j].hoursTracked);
                }
                var weeks = [];
                for (var k = 0; k < WeekData.length; k++) {
                    weeks.push(moment(WeekData[k]).format("MMM D"));
                }
            finalData.push({
                name: 'userCount',
                data: hours,
            });
            this.setState({
                series: finalData,
              });
              this.setState((prevState) => {
                let options = Object.assign({}, prevState.options);
                options = {
                  xaxis: {
                    categories: weeks,
                  },
        
                };
                return { options };
              });
      }
    }
  

      monthDays = (FirstDay, LastDay) => {
        var weekDays = [];
        var generator = range(moment(FirstDay), moment(LastDay), { step: 1, unit: "d", });
        for (const day of generator) {
          weekDays.push(day.format("YYYY-MM-DD")); // 2020-01-01 -> 2020-01-03 -> 2020-01-05
        }
        return weekDays;
      };
      thisMonth = () => {
        this.setState({loading:true,weekDays:[]})
        const timezone =timezoneHelper()
        var FirstDay = moment().tz(timezone).startOf('month').format("YYYY-MM-DD");
        var LastDay = moment().tz(timezone).endOf('month').format("YYYY-MM-DD");
        this.setState({
          SelectedThisMonth: true,
          SelectedLastMonth: false,
          weekDays: this.monthDays(FirstDay,LastDay),
        });
        this.setState({ isUserDayWiseData: false,loading:false});
        this.getAllTenantDetailsApi();
        return { FirstDay, LastDay };
      };
      lastMonth = () => {
        this.setState({loading:true,weekDays:[]})
        const timezone =timezoneHelper()
        var FirstDay = moment().tz(timezone).subtract(1, "months").startOf("month").format("YYYY-MM-DD"); // or...
        var LastDay = moment().tz(timezone).subtract(1, "months").endOf("month").format("YYYY-MM-DD");
        this.setState({
          SelectedThisMonth: false,
          SelectedLastMonth: true,
          weekDays: this.monthDays(FirstDay,LastDay),
        });
        this.setState({ isUserDayWiseData: false,loading:false});
        this.getAllTenantDetailsApi();
        return { FirstDay, LastDay };
      };
        render() {
            return(
                <div>
                <Card className="projectPulseCard">
        <CardContent>
          
          <div className="d-flex">
            <div className="w-50">
            </div>
            <div className="option-container w-50">
              <Button onClick={this.thisMonth} className={ this.state.SelectedThisMonth ? "selected-button" : ""} variant="outlined" size="small" >
              {"This Month"}
              </Button>
              <Button onClick={this.lastMonth} className={this.state.SelectedLastMonth  ? "selected-last-week"  : "br-unset"} variant="outlined" size="small" >
                {"Last Month"}
              </Button>
            </div>
          </div>
          {(this.state.loading || this.state.isUserDayWiseData) && 
           <div >
            {this.state.isUserDayWiseData ? 
            <div className="dashboard-barchart-container">
              No data Avaliable
            </div>
            :<div className="noteamuser-text"><Loading  /></div>}
           </div>
          }
            <div id="chart" className={(!this.state.loading && !this.state.isUserDayWiseData) ? 'disp-block':'disp-none'}>
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="area"
                height={250}
              />
            </div>
        </CardContent> 
      </Card>
                </div>
            )
        }
}
export default UserMonthWiseChart