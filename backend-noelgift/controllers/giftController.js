const Gift = require('../models/Gift');
const GiftRequest = require('../models/GiftRequest');
const User = require('../models/User');


exports.getAllGifts = async (req, res) => {
  try {
    const gifts = await Gift.find();
    res.json(gifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRequest = async (req, res) => {
  try {
    const { userId, type, giftName } = req.body;

    const existingRequests = await GiftRequest.find({ userId });
    if (existingRequests.length >= 2) {
      return res.status(400).json({ message: 'Limite de 2 demandes atteinte' });
    }

    const gift = await Gift.findOne({ type, name: giftName });
    if (!gift) {
      return res.status(404).json({ message: 'Cadeau non trouvé' });
    }

    const newRequest = await GiftRequest.create({
      userId,
      type,
      giftName,
      description: gift.description,
    });

    res.status(201).json({ message: 'Demande enregistrée', request: newRequest });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRequestsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const requests = await GiftRequest.find({ userId });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    await GiftRequest.findByIdAndDelete(requestId);
    res.json({ message: 'Demande supprimée' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Créer des cadeaux de base 
exports.seedGifts = async (req, res) => {
  try {
    const gifts = [
      { type: 'Jouet', name: 'Poupée Barbie', description: 'Une jolie poupée rose avec accessoires.' },
      { type: 'Jouet', name: 'Lego City', description: 'Un ensemble Lego amusant pour les enfants.' },
      { type: 'Électronique', name: 'Voiture téléguidée', description: 'Petite voiture télécommandée rouge.' },
      { type: 'Électronique', name: 'Casque Bluetooth', description: 'Casque audio sans fil de qualité.' },
    ];

    await Gift.insertMany(gifts);
    res.json({ message: 'Cadeaux ajoutés avec succès', gifts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
