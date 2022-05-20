import React, { useState } from "react";
import { Formik } from 'formik';
import {Typography,Tabs,Tab, CircularProgress} from "@material-ui/core";
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import useStyles from "./styles";
import logo from "./logo.png";
import { withRouter } from "react-router-dom";
import { UserContext, useUserDispatch } from "../../context/UserContext";
import "./login.css";
import { Link } from 'react-router-dom';

function Login(props) {
  var classes = useStyles();
  var userDispatch = useUserDispatch();

  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <div className="flex-sec-login bg-white">
    <div className="left">
        <div className="Login-section">
        <img src={logo} alt="logo"/>
            {/* <h1 className="main-heading">Dashboard</h1>                         */}
        </div>
       
    </div>
<div className="right wd-40"> 
<div className="Login-section">
    <div className="Login-blk">               
      <div className="max-50">
        <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}  
              className="active"                         
              centered
            >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="SignUp" classes={{ root: classes.tab }} 
             component={Link} 
             to='/signUp'
            />
          </Tabs>
          {activeTabId === 0 && (
             <React.Fragment>
              <Formik
                  initialValues={{
                    email: '',
                    password: ''
                }}
                onSubmit = {(
                
                  ({ email, password }, { setStatus, setSubmitting ,setFieldError}) => {
                    setStatus();
                    UserContext.loginUser(email,password,userDispatch)
                        .then(
                          email => {
                                const { from } = props.location.state || { from: { pathname: "/" } };
                            },
                            error => {
                              if (error) {
                                if(error.response){
                                  if(Array.isArray(error.response.data)){
                                    setStatus(error.response.data[0].message)
                                  }
                                  else{
                                    setStatus(error.response.data)
                                  }
                                }
                                else{
                                  setStatus("Invalid error response")
                                }
                              }
                            
                             
                               
                                setSubmitting(false);
                            }
                        );
                
                 } )}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Invalid email').required('Email is Required'),
                  password: Yup.string().required('Password is Required').min(7, 'Too Short!')
              })}
              >
                {
                (props) => {
                  const {
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    status
                  } = props;
                  return (
                    <form onSubmit = { handleSubmit }>

                            <div className="field-grp">
                                <TextField 
                                error={errors.email && touched.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="email" label="E-mail" type="text" 
                                helperText={(errors.email && touched.email ? ' is-invalid' : '')}                               
                                id="outlined-margin-dense" margin="dense" variant="outlined" className="text-field"/>                                
                            </div>
                           
                            <div className="field-grp">
                                <TextField name="password"
                                 error={errors.password && touched.password}
                                   onBlur={handleBlur}
                                label="Password" type="password" 
                                  onChange={handleChange}
                                helperText={(errors.password && touched.password ? ' is-invalid' : '')}                                
                                  id="outlined-margin-dense" margin="dense" variant="outlined" className="text-field"/>                                
                            </div> 
                            
                            <div className="field-grp pt-15">
                            <Button variant="outlined" type="submit" color='primary' disabled={isSubmitting}> Login </Button>
                            {/* <a size="large" className="forgetButton" href="#">Forgot Password</a> */}
                            {isSubmitting &&
<CircularProgress/>                                
}
                            </div>
                            <br/>

                            {status &&
                <Alert severity="error">{status}</Alert>
                            }
                                                      
                          </form>
                  );
                }}
              
              </Formik>
              </React.Fragment>
               )}
              
              </div>
              <div className="center copyright-section">
              <Typography className="copyright">
                © 2020 ADOL. All rights reserved.
              </Typography>
              </div>
             
    
</div>
</div>
</div>
</div>
        );
}
export default withRouter(Login);