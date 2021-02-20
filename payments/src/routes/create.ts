import express, { Request, Response } from 'express';
import { stripe } from '../stripe';
import { body } from 'express-validator';
import { requireAuth, validateRequest, BadRequestError, NotFoundError, NotAuthorizedError, OrderStatus } from '@wztickets/common';
import { PaymentCreatedPublisher } from '../events/publishers/paymentCreatedPublisher';
import { natsWrapper } from '../natsWrapper';
import { Order } from '../models/order';
import { Payment } from '../models/payment';

const router = express.Router();

router.post('/api/payments', requireAuth,
    [
        body('token')
            .notEmpty()
            .withMessage('token must be provided'),
        body('orderId')
            .notEmpty()
            .withMessage('orderId must be provided')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { token, orderId } = req.body;

        const order = await Order.findById(orderId);

        if (!order) {
            throw new NotFoundError();
        }

        if (order.userId != req.currentUser!.id) {
            throw new NotAuthorizedError();
        }

        if (order.status === OrderStatus.Cancelled) {
            throw new BadRequestError('can not pay for an cancelled order');
        }

        const charge = await stripe.charges.create({
            amount: order.price * 100,
            currency: 'usd',
            source: token
        });

        const payment = Payment.build({
            orderId: orderId,
            stripeId: charge.id
        });
        await payment.save();

        await new PaymentCreatedPublisher(natsWrapper.client).publish({
            id: payment.id,
            orderId: payment.orderId,
            stripeId: payment.stripeId
        });

        res.status(201).send({ id: payment.id });
    });

export { router as createChargeRouter };