import { Notification } from "../entities/notification";

export abstract class NotificationsRepository {
    abstract create(notification: Notification): Promise<void>;
    abstract findById(notificationId: string): Promise<Notification | null>;
    abstract save(notification: Notification): Promise<void>;
    abstract countManyByRecipientID(recipientId: string): Promise<number>;
    abstract findManyByRecipientID(recipientId: string): Promise<Notification[]>;
}