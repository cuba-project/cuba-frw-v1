import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
    constructor(
        private emailService:MailerService
    ){

    }

    @OnEvent('order-confirm')
    async orderConfirmEmail(data:any) {
      console.log("event emit order ",data);
      try{
        if(data.to){
          await this.emailService.sendMail({
            to: data.to,
            subject:data.subject,
            template: './order-confirm',
            context: data
          });
        }else{
          //need to set email
        }
      }catch(e){
        console.log("send email error",e)
      }
    }
}
