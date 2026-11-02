const ordersStore = [];

export const createOrderIntent = (req, res) => {
  try {
    const { customer, items, subtotal, deliveryFee, total } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid order payload.' });
    }

    const orderRef = `PM-ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      orderRef,
      customer,
      items,
      subtotal,
      deliveryFee,
      total,
      status: 'AWAITING_TRANSPORT_CONFIRMATION',
      createdAt: new Date().toISOString()
    };

    ordersStore.push(newOrder);
    console.log('[ORDER REGISTERED]', orderRef, newOrder.customer.fullName);

    res.status(201).json({
      success: true,
      orderRef,
      message: 'Order registered. Sivakasi transport booking confirmation in progress.',
      requiresBackend: false
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error creating order', error: error.message });
  }
};

export const getOrders = (req, res) => {
  res.json({ success: true, count: ordersStore.length, data: ordersStore });
};

