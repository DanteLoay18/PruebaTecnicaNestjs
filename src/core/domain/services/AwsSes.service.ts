

import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

@Injectable()
export class AwsSesService {
  private client: SESClient;

  constructor() {
    this.client = new SESClient({ region: process.env.AWS_REGION,  credentials : { accessKeyId : process.env.AWS_ACCESS_KEY ?? '', secretAccessKey: process.env.AWS_SECRET_KEY ?? ''} });
  }

  async sendEmail(to: string[], subject: string, body: string) {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: to
      },
      Message: {
        Body: {
          Html: { Data: body }
        },
        Subject: { Data: subject }
      },
      Source: 'no-reply@vexplora.com' 
    });

    await this.client.send(command);
  }
}
