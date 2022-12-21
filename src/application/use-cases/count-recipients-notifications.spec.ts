import { Content } from "@application/entities/content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { Notification } from "../entities/notification"
import { CancelNotification } from "./cancel-notification"
import { CountRecipientNotification } from "./count-recipients-notifications"
import { NotificationNotFound } from "./errors/notification-not-found"


describe('count recipients notification', () => {
    it('should be able to count a recipient notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const countRecipientNotification = new CountRecipientNotification(notificationsRepository)

        notificationsRepository.create(makeNotification())
        notificationsRepository.create(makeNotification())
        notificationsRepository.create(makeNotification({ recipientId: 'example2' }))

        const { count } = await countRecipientNotification.execute({
            recipientId: 'example'
        })

        expect(count).toBe(2)
    })
})