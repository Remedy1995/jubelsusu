const date =function() {
    var date=new Date();
    var day=date.getUTCDay();
    var year=date.getUTCFullYear();
    var month=date.getUTCMonth();
    const dat=date.getUTCDate();
    
    console.log(year);
    console.log(month);
    console.log(dat);
  
    //use switch to check the day
  switch(day){
  case 0:
    day="Sunday";
    break;
  case 1:
    day="Monday";
    break;
  case 2:
    day="Tuesday";
    break;
  case 3:
    day="Wednesday"
    break;
  case 4:
    day="Thurday";
    break;
  case 5:
    day="Friday";
    break;
  case 6:
    day="Saturday";
    break;
    }
    
    const fullDate= day +" " +(dat)+"/"+(month+1)+"/"+year;
    //for the full date
    return fullDate;
  }
    // const SystemName=function(){
    //     let systemName="Inventory System";
    //     console.log(systemName);
    // }
    module.exports=date;
    // module.exports.SystemName=SystemName;
  