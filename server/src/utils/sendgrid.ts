/* eslint-disable @typescript-eslint/no-non-null-assertion */
import sendgrid from "@sendgrid/mail";


const API_KEY = process.env.SENDGRID_API_KEY!;
sendgrid.setApiKey(API_KEY);

export const FROM_ADDRESS = process.env.SENDGRID_FROM_ADDRESS!;
export const REGISTRATION_URL = process.env.CONFIRM_REGISTRATION_URL!;

export { sendgrid };