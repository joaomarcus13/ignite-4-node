import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationsRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { PrismaNotificationsMapper } from "../mappers/prisma-notification-mappers";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {

    constructor(
        private prisma: PrismaService
    ) { }

    async countManyByRecipientID(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId
            }
        })
        return count
    }

    async findManyByRecipientID(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId
            }
        })
        return notifications.map(PrismaNotificationsMapper.toDomain)
    }

    async create(notification: Notification): Promise<void> {
        const raw = PrismaNotificationsMapper.toPrisma(notification)
        await this.prisma.notification.create({
            data: raw
        })
    }

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })
        if (!notification) {
            return null
        }
        return PrismaNotificationsMapper.toDomain(notification)
    }

    async save(notification: Notification): Promise<void> {
        const raw = PrismaNotificationsMapper.toPrisma(notification)
        await this.prisma.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        })
    }

}