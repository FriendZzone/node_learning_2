/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import fs from 'fs'
import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses'
import { config } from 'dotenv'
import path from 'path'

config()
// Create SES service object.
const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string
  }
})

const createSendEmailCommand = ({
  fromAddress,
  toAddresses,
  ccAddresses = [],
  body,
  subject,
  replyToAddresses = []
}: {
  fromAddress: string
  toAddresses: string | string[]
  ccAddresses?: string | string[]
  body: string
  subject: string
  replyToAddresses?: string | string[]
}) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: ccAddresses instanceof Array ? ccAddresses : [ccAddresses],
      ToAddresses: toAddresses instanceof Array ? toAddresses : [toAddresses]
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: body
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject
      }
    },
    Source: fromAddress,
    ReplyToAddresses: replyToAddresses instanceof Array ? replyToAddresses : [replyToAddresses]
  })
}

export const sendVerifyEmail = (toAddress: string, subject: string, body: string) => {
  const sendEmailCommand = createSendEmailCommand({
    fromAddress: process.env.SES_FROM_ADDRESS as string,
    toAddresses: toAddress,
    body,
    subject
  })
  try {
    return sesClient.send(sendEmailCommand)
  } catch (error) {
    console.log('Send email error', error)
  }
}

const verifyEmailTemplate = fs.readFileSync(path.resolve('src/templates/verify-email.html'), 'utf8')

export const sendVerifyRegisterEmail = (toAddresses: string, email_verify_token: string) => {
  return sendVerifyEmail(
    toAddresses,
    'Verify your email',
    verifyEmailTemplate
      .replace('{{title}}', 'Please verify your email')
      .replace('{{content}}', 'Click the button below to verify your email')
      .replace('{{titleLink}}', 'Verify')
      .replace('{{link}}', `${process.env.CLIENT_URL}/verify-email?token=${email_verify_token}`)
  )
}

export const sendForgotPasswordEmail = (toAddresses: string, forgot_password_token: string) => {
  return sendVerifyEmail(
    toAddresses,
    'Forgot password',
    verifyEmailTemplate
      .replace('{{title}}', 'You are receiving this email because you requested to reset your password')
      .replace('{{content}}', 'Click the button below to reset your password')
      .replace('{{titleLink}}', 'Reset Password')
      .replace('{{link}}', `${process.env.CLIENT_URL}/reset-password?token=${forgot_password_token}`)
  )
}
