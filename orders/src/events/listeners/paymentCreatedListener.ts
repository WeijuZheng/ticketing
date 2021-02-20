import { Listener, PaymentCreatedEvent, Subjects, OrderStatus } from '@wztickets/common';
import { queueGroupName } from './queueGroupName';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId);

        if (!order) {
            throw new Error('order not found');
        }

        // need an event to tell other services the order was updated
        order.set({ status: OrderStatus.Complete });
        await order.save();

        msg.ack();
    }
}