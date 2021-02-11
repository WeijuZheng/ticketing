import { Publisher, OrderCancelledEvent, Subjects } from '@wztickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    readonly subject = Subjects.OrderCancelled;
}