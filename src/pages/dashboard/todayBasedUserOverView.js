import React, { Component } from "react";
import * as _ from "lodash";
import { List, ListItem,  Card, CardContent, ListSubheader, ListItemText, Avatar } from "@material-ui/core";
import moment from "moment";



class TodayBasedUserOverView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestData:[]
        }
    }
    async componentDidMount() {
        this.todayBasedDataProccess(this.props.tenantDetails);
      }
      componentDidUpdate(prevProps, prevState) {
        if (prevProps.tenantDetails !== this.props.tenantDetails) {
            this.todayBasedDataProccess(this.props.tenantDetails);

        }
      }
      todayBasedDataProccess = (data)=>{
          
          var sortDataBasedonCreatedAt = _.orderBy(data, 'createdAt', 'desc')
          

          this.setState({
            latestData:sortDataBasedonCreatedAt.slice(0,5)
          })
      }

      render(){
          return(
              <Card>
                  <CardContent>
                  <div className="d-flex">
                <div className="w-70">
                  <h3 className="people-time-tracker-title">{"Latest User"} </h3>
                </div>
              </div>
              {this.state.latestData.length===0 &&

            <div className="overall-card-padding-idle-time nodata-text top-app-skeleton-padding-top">  
            <span>{"No data Avaliable"}</span>
            </div>
              
              }

              {this.state.latestData.length!==0 &&
                  <div>
                  <List subheader={
                  <div className="flex w-100 list-heading-border-bottom"><div className="w-25"><ListSubheader>{"Name"}</ListSubheader></div>
                  <div className="w-25"><ListSubheader>{"Domain"}</ListSubheader></div>
                  <div className="w-25"><ListSubheader>{"PaymentStatus"}</ListSubheader></div>
                  <div className="w-25"><ListSubheader>{"Created"}</ListSubheader></div>
                  </div>}>
                  {this.state.latestData.map((latestList, index) => (           
                      <ListItem divider key={index} className="cursor-pointer"
                      onClick={this.props.handleAction.bind(this, latestList)}
                      >
                          <div className="flex w-100">
                              <div className="w-25">
                                  <ListItemText primary={latestList.fullname} />
                              </div>
                              <div className="w-25">
                                  <div className="mt mb">{latestList.domain}</div>
                                  </div>
                                  <div className="w-25">
                                  <div className="mt mb">{latestList.paymentStatus?latestList.paymentStatus:'-'}</div>
                                  </div>
                                  <div className="w-25">
                                  <div className="mt mb">{moment(latestList.createdAt).format('YYYY-MM-DD')}</div>
                                  </div>
                          </div>
                      </ListItem>
                     
                  ))}
                   {/* <div className="link-app-hours-padding">
                   <Link to="/activity/apps" className="link-Style-apps">
                          {t("View More Apps")}
                         </Link>
                      </div> */}
                  </List>
               </div> 
              }

          
           </CardContent>
              </Card>
            
          )
      }
}
export default TodayBasedUserOverView