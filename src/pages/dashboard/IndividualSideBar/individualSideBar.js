import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./individualSidebar.css";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';
import TimelapseOutlinedIcon from '@material-ui/icons/TimelapseOutlined';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import Backbtn from '../../tenantDetails/Backbtn';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NoteIcon from '@material-ui/icons/Note';
import IndividualUserDetails from '../IndividualUserDetails';
import BillingHistory from '../../tenantDetails/BillingHistory';
import { TenantUsers } from '../../tenantDetails/users';
import TenantLogs from '../../tenantDetails/TenantLogs';
import BackbtnIcon from '../../Users/BackbtnIcon';
import TuneOutlinedIcon from '@material-ui/icons/TuneOutlined';
import AddOnsFeatures from '../../tenantDetails/AddOns';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    marginBottom:'10px',
  },
  tabs: {
    padding:'12px',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));
export default function IndividualSideBar(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    console.log("showDashboard",props.showDashboard)

        return(
     
            <div className="h-445 profile-sidebar">
               
                <div className={classes.root} >
                     
                     <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        className="tabs-left-sec-features"
                       >                            
                       <div className="features-sidebar-header flex">
                       {props.allUser===false &&
                  <Box component="div" display="block"  className="text-left ">
                  <Backbtn back={props.showDashboard}/>
                  </Box>
            } 
            {props.allUser===true &&
                  <Box component="div" display="block"  className="text-left ">
                  <BackbtnIcon back={props.showDashboard}/>
                  </Box>
            }
            <div className="tenant-m-t">{"Tenant Details"}</div></div> 
                       <Tab className={ value === 1 ? "link-active" : "default-color"} label={"Profile"} icon={<AccountCircleIcon className="MultilineChartIcon"/> } {...a11yProps(1)} />
                               <Tab className={ value === 2 ? "link-active" : "default-color"} label={"Billing History"} icon={<HistoryIcon className="MultilineChartIcon"/> } {...a11yProps(2)} />
                                <Tab className={ value === 3 ? "link-active" : "default-color"} label={"Users Details"} icon={<PersonIcon className="PersonIcon"/>} {...a11yProps(3)} />
                                <Tab className={ value === 4 ? "link-active" : "default-color"} label={"User Logs"} icon={<NoteIcon className="NoteIcon"/>} {...a11yProps(4)} />
                                <Tab className ={value === 5? "link-active" : "default-color"} label={"Add On Feauters"} icon={<TuneOutlinedIcon className="NoteIcon"/>} {...a11yProps(4)} />
                              
                         
                    </Tabs>

                    <TabPanel value={value} index={1} className="tab-content-sec">
                    <div className="features-page default-content-scroll">
                   
                    <div>
                        <IndividualUserDetails 
                        tenantData={props.tenantData}
                        />
                        </div> 
                        </div>
                      </TabPanel>
                    <TabPanel value={value} index={2} className="tab-content-sec">
                    <div className="default-content-scroll">
                    <div>
                    <BillingHistory tenantData={props.tenantData}/>
                        </div> 
                        </div>      
                    </TabPanel>
                    <TabPanel value={value} index={3} className="tab-content-sec">
                    <div>
                      <div>
                        <div className="default-content-scroll">
                        <TenantUsers tenantData={props.tenantData}/>
                        </div>
                    </div>
                    </div>
                    </TabPanel>
                    <TabPanel value={value} index={4} className="tab-content-sec">
                    <div>
                      <div>
                        <div className="default-content-scroll">
                        <TenantLogs tenantData={props.tenantData}/>
                        </div>
                    </div>
                    </div>
                    </TabPanel>
                    <TabPanel value={value} index={5} className="tab-content-sec">
                    <div>
                      <div>
                        <div className="default-content-scroll">
                        <AddOnsFeatures tenantData={props.tenantData}
                        />
                        
                        </div>
                    </div>
                    </div>
                    </TabPanel>
                    </div>

            </div>
        )
}
