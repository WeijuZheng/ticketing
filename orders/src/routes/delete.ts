import express, { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/order';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@wztickets/common';

const router = express.Router();

router.delete('/api/orders/:orderid', requireAuth, async (req: Request, res: Response) => {
    const { orderid } = req.params;

    const order = await Order.findById(orderid);

    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled

    res.status(204).send(order);
});

export { router as deleteOrderRouter };