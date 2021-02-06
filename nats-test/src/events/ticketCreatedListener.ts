import { Listener } from './baseListener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticketCreatedEvent';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payment-service'

    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);
        msg.ack();
    }
}