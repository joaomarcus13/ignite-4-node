import { Content } from "@application/entities/content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { Notification } from "../entities/notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { ReadNotification } from "./read-notification"
import { UnreadNotification } from "./unread-notification"


describe('unread notification', () => {
    it('should be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        const notification = makeNotification({
            readAt: new Date()
        })

        notificationsRepository.create(notification)

        await unreadNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(null)
    })

    it('should not be able to unread a notification when it does not exist', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotification = new UnreadNotification(notificationsRepository)

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id'
            })
        }).rejects.toThrow(NotificationNotFound)
    })
})