import cron from 'node-cron';
import ConnectionRequestModel from '../models/connectionRequest.model.js';
import {  endOfDay, startOfDay, subDays } from 'date-fns';


const yesterday=subDays(new Date(),1)
const yStart=startOfDay(yesterday)
const yEnd=endOfDay(yesterday)

cron.schedule('* * * * * 7', async() => {

    console.log("hello")
  const details=await ConnectionRequestModel.find({status:'interested',createdAt:{
   $gte:yStart, $lt:yEnd
  }}).populate("toUserId")


  const emails=[...new Set(details.map(data=>data.toUserId.emailId))]

  console.log("CONNECTIONrEQUEST",emails);

});



