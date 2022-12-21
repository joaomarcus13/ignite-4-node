import { Content } from "@application/entities/content"
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { Notification } from "../entities/notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { ReadNotification } from "./read-notification"


describe('read notification', () => {
    it('should be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        const notification = new Notification({
            category: 'social',
            content: new Content("content"),
            recipientId: 'example'
        })

        notificationsRepository.create(notification)

        await readNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read a notification when it does not exist', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotification = new ReadNotification(notificationsRepository)

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})