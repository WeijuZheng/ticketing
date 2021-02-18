import { Publisher, Subjects, ExpirationCompleteEvent } from '@wztickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
}