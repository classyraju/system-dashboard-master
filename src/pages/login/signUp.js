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

function SignUp(props) {
  var classes = useStyles();
  var userDispatch = useUserDispatch();
  var [activeTabId, setActiveTabId] = useState(1);

  return (
    <div className="flex-sec-login bg-white">
    {/* <div> */}
    <div className="left">
        <div className="Login-section">
        <img src={logo} alt="logo"/>
                                 
        </div>
       
    </div>
        
<div className="right wd-40"> 
{/* <div >  */}

<div className="Login-section">
    <div className="Login-blk">               
      <div className="max-50">
      <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}              
              className="active"
              centered
            >
            <Tab label="Login" classes={{ root: classes.tab }} 
             component={Link} 
             to='/login'/>
            <Tab label="SignUp" classes={{ root: classes.tab }} 
             component={Link} 
             to='/signUp'
            />
          </Tabs>
          {activeTabId === 1 && (
             <React.Fragment>
              <Formik
                  initialValues={{
                    username:'',
                    email: '',
                    password: ''
                }}
                onSubmit = {(
                
                  ({ username,email,password }, { setStatus, setSubmitting ,setFieldError}) => {
                    setStatus();
                    UserContext.signup(username,email,password,userDispatch)
                        .then(
                          email => {
                                const { from } = props.location.state || { from: { pathname: "/" } };
                                // props.history.push(from);
                            },
                            error => {
                                if(error.response.data[0].message){
                                    setStatus(error.response.data[0].message);
                                   
                                }
                                else{
                                    setStatus(error.response.data);
                                }
                               
                                setSubmitting(false);
                            }
                        );
                
                 } )}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Invalid email').required('Email is Required'),
                  password: Yup.string().required('Password is Required').min(7, 'Too Short!'),
                  username: Yup.string().required('username is Required'),
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
                                error={errors.username && touched.username}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                name="username" label="User Name" type="text" 
                                helperText={(errors.username && touched.username ? ' is-invalid' : '')}                               
                                id="outlined-margin-dense" margin="dense" variant="outlined" className="text-field"/>                                
                            </div>
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
                            <Button variant="outlined" type="submit" disabled={isSubmitting}> Sign Up </Button>

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
export default withRouter(SignUp);