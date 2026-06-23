import Order from '../models/Order.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private (Consumers)
export const addOrderItems = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        totalPrice,
      });

      const createdOrder = await order.save();
      
      // TODO: Trigger automated PDF bill generation here
      
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    next(error);
  }
};