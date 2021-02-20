import { Publisher, PaymentCreatedEvent, Subjects } from '@wztickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}