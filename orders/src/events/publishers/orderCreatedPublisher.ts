import { Publisher, OrderCreatedEvent, Subjects } from '@wztickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
}