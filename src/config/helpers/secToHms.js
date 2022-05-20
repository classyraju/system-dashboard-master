export const secToHms=(sec) => {
    var TimePeriod=" "
    if (sec !== undefined) {
      if (sec === 0) {
         TimePeriod = "-";
      }
      let hours = Math.floor(sec / 3600);
      sec %= 3600;
      let minutes = Math.floor(sec / 60);
      let seconds = sec % 60;
      var min = String(minutes).padStart(2, "0");
      var hr = String(hours).padStart(2, "0");
      var sec = String(seconds).padStart(2, "0");
      var time = hr + ":" + min + ":" + sec;
     if(time >= "00:00:01" && time <= "00:00:59") {
         TimePeriod = "<1m";
      } else if (time > "00:00:59" && hours === 0) {
         TimePeriod = minutes + "m";
      } else if (hours !== 0) {
         if(hours !== 0 && minutes!==0){
         TimePeriod = hours + "h" + " " + minutes + "m";
         }
         else{
            TimePeriod = hours + "hrs";
         }
      }
    }

    return TimePeriod;
  }