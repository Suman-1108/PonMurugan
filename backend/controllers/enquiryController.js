// In-memory or file-backed store for enquiries
const enquiriesStore = [];

export const createEnquiry = (req, res) => {
  try {
    const { name, phone, email, enquiryType, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required.' });
    }

    const enquiryRecord = {
      id: `ENQ-${Date.now().toString().slice(-6)}`,
      name,
      phone,
      email: email || '',
      enquiryType: enquiryType || 'General Enquiry',
      message: message || '',
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    enquiriesStore.push(enquiryRecord);
    console.log('[ENQUIRY RECEIVED]', enquiryRecord);

    res.status(201).json({
      success: true,
      message: 'Your enquiry has been received by our Sivakasi sales desk.',
      enquiryId: enquiryRecord.id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error processing enquiry', error: error.message });
  }
};

export const getEnquiries = (req, res) => {
  res.json({ success: true, count: enquiriesStore.length, data: enquiriesStore });
};

