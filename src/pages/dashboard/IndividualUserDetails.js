import React, { Component } from "react";
import { Card, Grid } from "@material-ui/core";
import "../dashboard/dashboard.css";
import Typography from '@material-ui/core/Typography';
class IndividualUserDetails extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }




    render(){
        return(
            <div>
                
                <Typography  variant="h6" gutterBottom>
                        {"Tenant Information"}
                      </Typography>
                    <div className="flex pt pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Full Name"}</div>
                        <div className="wid-76">{this.props.tenantData.fullname}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100 word-break">
                        <div className="wid-24 color font-size font-weight">{"Email"}</div>
                        <div className="wid-76">{this.props.tenantData.email}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Payment Status"}</div>
                        <div className="wid-76">{this.props.tenantData.paymentStatus?this.props.tenantData.paymentStatus:'-'}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Phone Number"}</div>
                        <div className="wid-76">{this.props.tenantData.phoneNumber}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Domain"}</div>
                        <div className="wid-76">{this.props.tenantData.domain}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Country"}</div>
                        <div className="wid-76">{this.props.tenantData.country.name}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Current Plan"}</div>
                        <div className="wid-76">{this.props.tenantData.subscription?this.props.tenantData.subscription.product.name:'-'}</div>
                    </div>
                    <div className="flex pt-15 pl wid-100">
                        <div className="wid-24 color font-size font-weight">{"Total Users"}</div>
                        <div className="wid-76">{this.props.tenantData.userCount}</div>
                    </div>
            </div>
        )
    }
}
export default IndividualUserDetails