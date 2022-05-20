import { decryptLocalStorage } from "../secure";
export const timezoneHelper = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  var userSettings = decryptLocalStorage(JSON.parse(localStorage.getItem("_user")));
  return (userSettings&&userSettings.timezone ? JSON.parse(userSettings.timezone).value : tz)
}
export const convertTZ = (date, tzString) => {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
}
  // export const timezoneHelper=() => {
  //   const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  //   var companySettingDetails = decryptLocalStorage(JSON.parse(localStorage.getItem("companySettings")));
  //   return (companySettingDetails.timezone?companySettingDetails.timezone.value:tz)
  // }