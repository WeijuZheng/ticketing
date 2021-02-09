import { Publisher, Subjects, TicketCreatedEvent } from '@wztickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    
}