import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@wztickets/common';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders/:orderid', requireAuth, async (req: Request, res: Response) => {
    // assuming orderid is in the format of mongoDB id

    const order = await Order.findById(req.params.orderid).populate('ticket');
    if (!order) {
        throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError();
    }

    res.send(order);
});

export { router as showOrderRouter };