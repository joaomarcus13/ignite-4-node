import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-models';
import { CancelNotification } from '@application/use-cases/cancel-notification'
import { ReadNotification } from '@application/use-cases/read-notification'
import { UnreadNotification } from '@application/use-cases/unread-notification'
import { CountRecipientNotification } from '@application/use-cases/count-recipients-notifications'
import { GetRecipientNotification } from '@application/use-cases/get-recipient-notifications'

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,

  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id
    })
  }

  @Get('count/from/:id')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId: id
    })
    return { count }
  }
  @Get('from/:id')
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientId: id
    })
    return { notifications: notifications.map(NotificationViewModel.toHttp) }
  }


  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id
    })
  }
  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id
    })
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body
    console.log(body)
    const { notification } = await this.sendNotification.execute({ recipientId, content, category })

    return {
      notification: NotificationViewModel.toHttp(notification)
    }
  }
}
