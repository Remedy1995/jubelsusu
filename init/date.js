const FullDate = function () {
  const date = new Date();
  var day = date.getDay();
  const year = date.getFullYear();
  var month = date.getMonth() + 1;
  var todayDate = date.getDate();

  if (month < 10) {
    month = "0".concat(month);
  }
  //use switch to check the day
  switch (day) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday"
      break;
    case 4:
      day = "Thurday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }

  //const fullDate = day +" " + dat +"/"+ month+"/"+year;
  const fullDate = day.concat(" ").concat(todayDate).concat("-").concat(month).concat("-").concat(year);
  //for the full date
  return fullDate;
}

module.exports = FullDate;
    // module.exports.SystemName=SystemName;
