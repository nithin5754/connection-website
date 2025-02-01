



import { SESClient } from "@aws-sdk/client-ses";

const REGION = "ap-south-1";

const sesClient = new SESClient({ region: REGION,credentials:{
  accessKeyId:process.env.AWS_SES_ACCESS_KEY,
  secretAccessKey:process.env.AWS_SES_SECRET_KEY
} });
export { sesClient };
