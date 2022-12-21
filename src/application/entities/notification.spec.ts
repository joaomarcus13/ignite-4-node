import { Content } from "./content"
import { Notification } from "./notification"



describe('notification', () => {

    test('it should be able to create a notification', () => {
        const content = new Notification({
            content: new Content('voce recebeu uma solicitacao'),
            category: 'social',
            recipientId: '1'
        })
        expect(content).toBeTruthy()
    })

}) 