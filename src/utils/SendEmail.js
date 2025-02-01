
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "./sesClient.js";


const createSendEmailCommand = (toAddress, fromAddress) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [
 
      ],
      ToAddresses: [
        toAddress,
   
      ],
    },
    Message: {
   
      Body: {
       
        Html: {
          Charset: "UTF-8",
          Data: "<h1>hello nithinjoji</h1>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "this is nithin",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "hey",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
    
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand(
    "nithinjoji0756@gmail.com",
    "hr@www.connection.phaseex.live",
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
 
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};


export {run}