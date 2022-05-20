import React, { Component } from "react";
import * as _ from "lodash";
import ReactApexChart from "react-apexcharts";
import { timezoneHelper } from "../../../config/helpers/timezone";
import { range } from "@simonja/moment-date-range";
import moment from "moment-timezone";
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { Card,CardContent,Button} from "@material-ui/core";
import Loading from '../../../config/helpers/Loading';
import '../../dashboard/dashboard.css'

class EmailverifiedandNotverifiedChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weekDays: [],
            loading:true,
            isUserEmailWiseData: false,
            SelectedThisMonth: false,
            SelectedLastMonth: false,
            series: [{
                name: '',
                data: []
              }],
              options: {
                chart: {
                  type: 'bar',
                  height: 350
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                    columnWidth: '70%',
                  },
                },
                colors:['#26c644','#D3D3D3','#feb079'],
                dataLabels: {
                  enabled: false
                },
                stroke: {
                  show: true,
                  width: 0,
                  colors: ['transparent']
                },
                xaxis: {
                  categories: [],
                },
                yaxis: {
                  title: {
                    text: 'Total Mails'
                  }
                },
                fill: {
                  opacity: 1
                },
                tooltip: {
                  y: {
                    formatter: function (val) {
                      return  val 
                    }
                  }
                },
                legend: {
                    show: false,
                  }
              },
        }
        this.thisMonth = this.thisMonth.bind(this);
        this.lastMonth = this.lastMonth.bind(this);
    }

    async componentDidMount() {
        this.thisMonth();
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.emailVerificationDetails !== this.props.emailVerificationDetails) {
            this.thisMonth();
        }
      }

      UserDayWiseEmailProcess = (data,tenantData,weekArray)=>{
        if(data){
            var userReport = data; 
            var WeekData = weekArray;
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
                    var foundUser = _.filter(dataList, user => user.dateFormating === WeekDay)
                    var tmp = {};
                    if (foundUser.length>0) {
                            var isVerifiedCount=0;
                            var isNotVerifiedCount=0
                        for(var k=0;k<foundUser.length;k++){
                             if(foundUser[k].isVerified){
                                isVerifiedCount=isVerifiedCount+1
                             }
                             else{
                                isNotVerifiedCount=isNotVerifiedCount+1
                             }
                        }
                          tmp = {
                         emailVerifiedCount: isVerifiedCount,
                         emailNotVerifiedCount:isNotVerifiedCount
                      };
                    } else {
                      tmp = {
                        emailVerifiedCount: 0,
                        emailNotVerifiedCount:0
                      };
                    }                    
                    tempUserDataList.push(tmp);
                  });
                var isverifiedData=[];
                var isNotverifiedData=[]
              
              for(var v=0;v<tempUserDataList.length;v++){
                  isverifiedData.push(tempUserDataList[v].emailVerifiedCount)
                  isNotverifiedData.push(tempUserDataList[v].emailNotVerifiedCount)
              }

              var weeks = [];
              for (var k = 0; k < WeekData.length; k++) {
                  weeks.push(moment(WeekData[k]).format("MMM D"));
              }
              finalData.push({
                  name: 'Verified Account',
                  data: isverifiedData,
              },
              {
                  name: 'Not Verified Account',
                  data: isNotverifiedData,
              },
              {
                name: 'Tenant Verified Account',
                data: this.tenantDetails(tenantData,weekArray),

              }
              );
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
      tenantDetails=(tenantData,weekArray)=>{
        console.log("tenantData",tenantData)
        if(tenantData){
          var userReport = tenantData;
          var WeekData = weekArray;
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
                  var foundUser = _.filter(dataList, user => user.dateFormating === WeekDay)
                  var tmp = {};
                  if (foundUser.length>0) {
                        tmp = {
                       tenatVerifiedCount: foundUser.length,
                    };
                  } else {
                    tmp = {
                      tenatVerifiedCount: 0,
                    };
                  }                    
                  tempUserDataList.push(tmp);
                });
                var isverifiedtenantData=[];
              for(var v=0;v<tempUserDataList.length;v++){
                isverifiedtenantData.push(tempUserDataList[v].tenatVerifiedCount)
              }
              console.log("tenantData",isverifiedtenantData)
              return isverifiedtenantData
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
        });
        this.setState({ isUserEmailWiseData: false,loading:false});
        this.UserDayWiseEmailProcess(this.props.emailVerificationDetails,this.props.tenantDetails,this.monthDays(FirstDay,LastDay));
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
        });
        this.setState({ isUserEmailWiseData: false,loading:false});
        this.UserDayWiseEmailProcess(this.props.emailVerificationDetails,this.props.tenantDetails,this.monthDays(FirstDay,LastDay));
        return { FirstDay, LastDay };
      };
    render(){
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
      {(this.state.loading || this.state.isUserEmailWiseData) && 
       <div >
        {this.state.isUserEmailWiseData ? 
        <div className="dashboard-barchart-container">
          No data Avaliable
        </div>
        :<div className="noteamuser-text"><Loading  /></div>}
       </div>
      }
        <div id="chart" className={(!this.state.loading && !this.state.isUserEmailWiseData) ? 'disp-block':'disp-none'}>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="bar"
            height={300}
          />
        </div>
    </CardContent> 
  </Card>
            </div>
        )
    }
}
export default EmailverifiedandNotverifiedChart