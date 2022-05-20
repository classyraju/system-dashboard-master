import React, { useEffect, useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { Button, TextField, Card, CircularProgress, Grid, Typography, Switch, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DarkTooltip } from "../../../config/helpers/tooltip.helper";
import { Autocomplete } from "@material-ui/lab";
import { UpdateFeatureApi } from "../../../Api/updateTenantFeaturesApi";
import { toaster } from "../../../config/helpers/toaster";



const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        border: 'unset',
        position: 'relative',
    },
    avatar: {
        margin: 'auto',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function AddOnsFeatures(props) {
    const [state, setState] = React.useState({
        checked: false,
    });
    const [feature,setFeature]= React.useState(null)
    const {tenantData} =props
    console.log('tenantData', tenantData)
    const exclusivePaths =["invoices","integrations","timesheets","activity/urls"]
        

    useEffect(() => {
        if(tenantData.overrides.isEnabled){
            setState({checked:true}) 
            setFeature(tenantData.overrides)
        }
    }, []);
    const handleChangeChecked = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        if(event.target.checked&&tenantData.overrides.isEnabled){
            setFeature(tenantData.overrides)
        }else if(event.target.checked&&!tenantData.overrides.isEnabled){
            if(tenantData&&tenantData.subscription){
            tenantData.subscription.product.exclusivePath=JSON.parse(tenantData.subscription.product.exclusivePath)
            setFeature(tenantData.subscription.product)

        }
        }else {
            setFeature(null)
        }
    };

    return (

        <div className="padd-15 width-profile-container">
            <Typography className={'mb-20'} variant="h6" gutterBottom>
                {"Add On Features"}
            </Typography>

         
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    initialValues={{
                        planname: feature?(feature.name?feature.name:''):'',
                        identifier: feature?(feature.identifier?feature.identifier:''):'',
                        userLimit: feature?(feature.userLimit?feature.userLimit:''):'',
                        invoiceLimit: feature?(feature.invoiceLimit?feature.invoiceLimit:''):'',
                        reportLimit: feature?(feature.reportLimit?feature.reportLimit:''):'',
                        storageLimit: feature?(feature.storageLimit&&feature.storageLimit.month?feature.storageLimit.month:''):'',
                        exclusivePath:feature?(feature.exclusivePath?feature.exclusivePath:[]):[],
                    }}
                    onSubmit={(

                        ({planname, identifier ,userLimit,reportLimit,invoiceLimit,storageLimit,exclusivePath}, { setStatus, setSubmitting, setFieldError, setErrors }) => {
                            const data ={id:tenantData.id,isEnabled:state.checked,name:planname, identifier ,userLimit,reportLimit,invoiceLimit,storageLimit:{month:storageLimit},exclusivePath}
                            UpdateFeatureApi(data)
                             .then(
                                email => {
                                    window.location.reload()
                                  toaster("Features Updated successfully updated",2000,"success",)
                                //   const { from } = props.location.state || { from: { pathname: "/" } };
                                setSubmitting(false);
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

                        })
                    }
                    // .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+~\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()~_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,"Must contain a minimum of 8 characters including a lower case, a number and a special character.")
                    validationSchema={Yup.object().shape({
                        planname: Yup.string(),
                        userLimit: Yup.number(),
                        identifier: Yup.string(),
                        reportLimit: Yup.number(),
                        invoiceLimit: Yup.number(),
                        storageLimit: Yup.number(),
                        exclusivePath: Yup.array(),
                    })}
                >
                    {
                        (props) => {
                            const {
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                setFieldValue,
                                status,
                                setErrors,
                                setStatus
                            } = props;
                            return (
                                <form onSubmit={handleSubmit} id="signup-form">
                                    <div className="w-full">
                                    <div className="mb-20">
                                        <FormControlLabel
                                            control={<Switch checked={state.checked} onChange={handleChangeChecked} name="checked" color="primary" labelPlacement="start" />}
                                            label="Add On Features"
                                        />
                                    </div>
                                        <div className="mb-20">
                                            <TextField
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                name='planname'
                                                value={values.planname}
                                                label="Plan Name "
                                                size="small"
                                                id="planname"
                                                error={errors.planname}
                                                onChange={handleChange}
                                                helperText={errors.planname}
                                                variant="outlined"
                                            // className="strip-text-field"


                                            />
                                        </div>


                              
                                        <div className="mb-20">

                                            <TextField
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                name='identifier'
                                                label="Plan Identifier"
                                                value={values.identifier}
                                                size="small"
                                                id="identifier"
                                                onChange={handleChange}

                                                error={errors.identifier}
                                                helperText={errors.identifier}
                                                variant="outlined"

                                            />

                                        </div>
                                 <div className="mb-20">

                                        <TextField
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            name='userLimit'
                                            label="User Limit"
                                            value={values.userLimit}
                                            size="small"
                                            id="userLimit"
                                            onChange={handleChange}

                                            error={errors.userLimit}
                                            helperText={errors.userLimit}
                                            variant="outlined"

                                        />

                                        </div>
                                        <div className="mb-20">

                                            <TextField
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                name='reportLimit'
                                                label="Report Limit"
                                                value={values.reportLimit}
                                                size="small"
                                                id="reportLimit"
                                                onChange={handleChange}

                                                error={errors.reportLimit}
                                                helperText={errors.reportLimit}
                                                variant="outlined"

                                            />

                                        </div>
                                        <div className="mb-20">

<TextField
    InputLabelProps={{ shrink: true }}
    fullWidth
    name='invoiceLimit'
    label="Invoice Limit"
    value={values.invoiceLimit}
    size="small"
    id="invoiceLimit"
    onChange={handleChange}

    error={errors.invoiceLimit}
    helperText={errors.invoiceLimit}
    variant="outlined"

/>

</div>
<div className="mb-20">

<TextField
    InputLabelProps={{ shrink: true }}
    fullWidth
    name='storageLimit'
    label="Storage Limit"
    value={values.storageLimit}
    size="small"
    id="storageLimit"
    onChange={handleChange}

    error={errors.storageLimit}
    helperText={errors.storageLimit}
    variant="outlined"

/>

</div>
<div className="mb-20">
<Autocomplete
        multiple
        options={exclusivePaths}
        onChange={(event,value)=>{
            // console.log('value',value)
            setFieldValue('exclusivePath',value)
        }}
        value={values.exclusivePath}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            error={errors.exclusivePath}
            helperText={errors.exclusivePath}
            InputLabelProps={{ shrink: true }}
            fullWidth
            name='exclusivePath'
            label="Exclusive Path"
            size="small"
            id="storageLimit"    
            variant="outlined"
            />
        )}
      />

</div>

                                    </div>




                                    <div className="field-grp pt-15">
                                        <Button className='custom-button-update-billing' fullwidth color="primary" type="submit" variant="contained" disabled={isSubmitting} > Update

                                            {isSubmitting && <CircularProgress className='loading-ui-icon' />}
                                        </Button>
                                    </div>
                                    <br />

                                    {status &&
                                        <Alert severity="error">{status}</Alert>
                                    }

                                </form>
                            );
                        }}

                </Formik> 




        </div>

    );

}


