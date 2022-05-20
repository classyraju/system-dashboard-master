


export const configData = {
    API_URL : process.env.REACT_APP_API_URL,
    SECRET_KEY:"W9qyPEe_!%MNPg%8"
};

function getDomain(){
    var splitDomain = /:\/\/([^\/]+)/.exec(window.location.href)[1];
    var domain = splitDomain.split('.').shift();
    // console.log("domain",domain)
    //  return  "https://"+domain+".hoursheetsapi.com/api/v1/"
    // return "http://dev.localhost:3000/api/v1/"
    if(process.env.NODE_ENV === "development"){
        return  "https://"+process.env.REACT_APP_API_URL
    }
    else{
        return  "https://"+process.env.REACT_APP_API_URL
    }
    //  return  "http://"+domain+".localhost:8080/api/v1/"
    //  return  "http://"+domain+".localhost:3000/api/v1/"
    //  var ApiUrl="http://dev.localhost:3001/api/v1/"
    
}