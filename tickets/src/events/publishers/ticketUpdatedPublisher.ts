import { Publisher, Subjects, TicketUpdatedEvent } from '@wztickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
    
}