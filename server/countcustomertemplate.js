const countcustomer=require('./models/count/countcustomers');

const countcustomertemplate= async function CountCustomerTemplate(){
  
  await countcustomer.find({}).then(information=>{
    for(i=0;i<information.length;i++){
        const total=information[i].total;//get the initial total
        console.log(total)
        var add=total+1;//we increment by 1 when a customer is registered
        var query = { total : total };//we search for the total field 
        var data = {total :  add}//we update our initial data 
        countcustomer.updateOne(query,data,(err,collection) => {
          if(err) throw err;
          console.log("Record updated successfully");
          console.log(collection);
        })

    }
})

//if no customers
await countcustomer.find({}).then(information=>{
    if(information.length<1){
        const initialsave=new countcustomer(
            {
                total:1,
                
            }
        )
        initialsave.save();
    }
})
}


module.exports=countcustomertemplate;

