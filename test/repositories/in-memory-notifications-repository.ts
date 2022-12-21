import { Notification } from "@application/entities/notification"
import { NotificationsRepository } from '@application/repositories/notification-repository'

// simulando banco
export class InMemoryNotificationsRepository implements NotificationsRepository {
    public notifications: Notification[] = []


    async findManyByRecipientID(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(n => n.recipientId === recipientId)
    }

    async countManyByRecipientID(recipientId: string): Promise<number> {
        return this.notifications.filter(n => n.recipientId === recipientId).length
    }


    async create(notification: Notification) {
        this.notifications.push(notification)
    }
    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find(item => item.id === notificationId)
        if (!notification) {
            return null;
        }
        return notification
    }
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(item => item.id === notification.id)
        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification
        }

    }


}
