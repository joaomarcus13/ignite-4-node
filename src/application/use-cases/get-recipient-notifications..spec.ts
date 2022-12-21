import { Content } from "@application/entities/content"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository"
import { Notification } from "../entities/notification"
import { CancelNotification } from "./cancel-notification"
import { CountRecipientNotification } from "./count-recipients-notifications"
import { NotificationNotFound } from "./errors/notification-not-found"
import { GetRecipientNotification } from "./get-recipient-notifications"


describe('get recipients notification', () => {
    it('should be able to get a recipient notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const getRecipientNotification = new GetRecipientNotification(notificationsRepository)

        notificationsRepository.create(makeNotification())
        notificationsRepository.create(makeNotification())
        notificationsRepository.create(makeNotification({ recipientId: 'example2' }))

        const { notifications } = await getRecipientNotification.execute({
            recipientId: 'example'
        })

        expect(notifications).toHaveLength(2)
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'example' }),
            expect.objectContaining({ recipientId: 'example' })
        ]))
    })
})