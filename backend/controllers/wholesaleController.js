const wholesaleStore = [];

export const createWholesaleEnquiry = (req, res) => {
  try {
    const {
      businessName,
      contactPerson,
      phone,
      email,
      categories,
      estimatedBudget,
      location,
      state,
      requirements
    } = req.body;

    if (!businessName || !contactPerson || !phone || !location) {
      return res.status(400).json({
        success: false,
        message: 'Business name, contact person, phone number, and location are required.'
      });
    }

    const record = {
      quoteRef: `PM-B2B-${Date.now().toString().slice(-6)}`,
      businessName,
      contactPerson,
      phone,
      email: email || '',
      categories: categories || [],
      estimatedBudget: estimatedBudget || '₹50,000 - ₹1,00,000',
      location,
      state: state || 'Tamil Nadu',
      requirements: requirements || '',
      status: 'PENDING_TIER_QUOTATION',
      createdAt: new Date().toISOString()
    };

    wholesaleStore.push(record);
    console.log('[WHOLESALE B2B INQUIRY]', record);

    res.status(201).json({
      success: true,
      message: 'Wholesale enquiry submitted! A dedicated Sivakasi B2B manager will contact you.',
      quoteRef: record.quoteRef
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getWholesaleEnquiries = (req, res) => {
  res.json({ success: true, count: wholesaleStore.length, data: wholesaleStore });
};

