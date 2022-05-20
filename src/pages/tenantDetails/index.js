import React, { useEffect, useRef, useState } from 'react';

import "./details.css";
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { CircularProgress} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

// Tabs

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ErrorBoundary from "../../config/helpers/ErrorBoundary"
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Backbtn from './Backbtn';
import { TenantUsers } from './users';
import BillingHistory from './BillingHistory';
import TenantLogs from './TenantLogs';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                    <Typography>{children}</Typography>
            
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '12ch',
        }

    }),
);

export default function TenantDetails(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [apiFetched,setApiFetched]=React.useState(false)
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const componentRef = useRef();

    return (
        
        // <Card className={classes.root} variant="outlined">
            // <div className="h-445 wd-100">
         
                // <CardContent ref={componentRef} className="billing-history-page">
                <>
            
                    <AppBar position="static"  color="transparent" className="shadow-none">
                        <Tabs value={value} onChange={handleChange} aria-label="subscription tabs" className=' bg-white'>
                            <Tab label="Billing history" {...a11yProps(0)} />
                            <Tab label="Users" {...a11yProps(1)} />
                            <Tab label="Logs" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <ErrorBoundary>
                        <BillingHistory tenantData={props.tenantData}/>
                        </ErrorBoundary>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ErrorBoundary>
                             <TenantUsers
                             tenantData={props.tenantData}/>
                        </ErrorBoundary>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ErrorBoundary>
                             <TenantLogs tenantData={props.tenantData}/>
                        </ErrorBoundary>
                    </TabPanel>

                </>
    );
}
