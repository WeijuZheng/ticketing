import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Order, OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../natsWrapper';

it('returns an error if the ticket does not exists', async () => {
    const ticketId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.generateCookie())
        .send({ ticketId })
        .expect(404);
});

it('returns an error if the ticket if already reserved', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    const order = Order.build({
        ticket: ticket,
        userId: 'asdqwe',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    order.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.generateCookie())
        .send({ ticketId: ticket.id })
        .expect(400);
});

it('reserves a ticket', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.generateCookie())
        .send({ ticketId: ticket.id })
        .expect(201);
});

it('emit an order created event', async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    await request(app)
        .post('/api/orders')
        .set('Cookie', global.generateCookie())
        .send({ ticketId: ticket.id })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});