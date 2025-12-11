const GiftRequest = require('../models/GiftRequest');
const User = require('../models/User');


exports.getFilteredRequests = async (req, res) => {
  try {
    const { country, city } = req.query;


    const requests = await GiftRequest.find()
      .populate('userId') 
      .lean();

  
    const filtered = requests.filter((r) => {
      if (country && r.userId?.pays !== country) return false;
      if (city && r.userId?.ville !== city) return false;
      return true;
    });

    res.json(filtered);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.getFilteredChildren = async (req, res) => {
  try {
    const { country, city } = req.query;

    const filter = {};

    if (country) filter.pays = country;
    if (city) filter.ville = city;

    const children = await User.find(filter).lean();

    res.json(children);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/admin/request-status/:id
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "pending" | "processing" | "delivered"

    if (!['pending', 'processing', 'delivered'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const request = await GiftRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Demande introuvable' });
    }

    request.status = status;
    await request.save();

    res.json({ message: 'Statut mis à jour', request });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
