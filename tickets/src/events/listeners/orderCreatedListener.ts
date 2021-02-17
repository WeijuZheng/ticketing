import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@wztickets/common';
import { queueGroupName } from './queueGroupName';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);

        // if no ticket, throw error
        if (!ticket) {
            throw new Error('ticket not found');
        }

        // mark the ticket as being reserved by setting its orderId property
        ticket.set({ orderId: data.id });

        // save the ticket
        await ticket.save();
        await new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            version: ticket.version,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId
        });

        // ack the message
        msg.ack();
    }
}