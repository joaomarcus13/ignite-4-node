import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { Notification } from "../entities/notification"
import { SendNotification } from "./send-notification"


describe('send notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const sendNotification = new SendNotification(notificationsRepository)
        const { notification } = await sendNotification.execute({
            category: 'social',
            content: 'notification',
            recipientId: '1'
        })

        expect(notification).toBeTruthy()
        expect(notificationsRepository.notifications).toContain(notification)
    })
})