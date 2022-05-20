 
  export const preProcessingUserTableData = (response) => {
    for(var i = 0;i<response.length;i++){
        response[i].fullname=response[i].firstname+' '+response[i].lastname
        response[i].UserInbuiltStatus=(response[i].status) ? 'Active' : 'In Active'
        response[i].OverallStatus=(response[i].isDelete) ? 'Removed From Subscription' : 'Has Active Subscription'
    }
    return response;
  }

