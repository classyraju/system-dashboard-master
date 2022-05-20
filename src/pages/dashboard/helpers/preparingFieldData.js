import * as _ from "lodash";

  export const preProcessingTableData = (response) => {
    for(var i = 0;i<response.length;i++){
        response[i].fullname=response[i].firstname+' '+response[i].lastname
        var str = response[i].firstname;
        var FirstLetter = str.charAt(0);
        response[i].FirstLetter = FirstLetter;
        response[i].folderSize= (response[i].folderSize) ? (response[i].folderSize / 1000).toFixed(2) : '-';
    }
    const sortedArray= _.orderBy(response, 'createdAt', 'desc') 
    console.log("sortedArray",sortedArray)
    return sortedArray;
  }

