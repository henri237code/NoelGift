const Parent = require('../models/Parent');
const User = require('../models/User');
const GiftRequest = require('../models/GiftRequest');

exports.addChild = async (req, res) => {
  try {
    const { parentId, nom, prenom, age } = req.body;

    if (!parentId || !nom || !prenom || !age) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const parent = await Parent.findById(parentId);
    if (!parent) {
      return res.status(404).json({ message: 'Parent introuvable.' });
    }

   
    const child = await User.findOne({
      nom: new RegExp(`^${nom}$`, 'i'),
      prenom: new RegExp(`^${prenom}$`, 'i'),
      age: Number(age),
    });

    if (!child) {
      return res.status(404).json({
        message: "Aucun enfant trouvé avec ce nom / prénom / âge. Il doit d'abord être inscrit.",
      });
    }

    if (parent.enfantsInscrits.some((id) => id.toString() === child._id.toString())) {
      return res.status(400).json({ message: 'Cet enfant est déjà associé à ce parent.' });
    }

    parent.enfantsInscrits.push(child._id);
    await parent.save();

    const updatedParent = await Parent.findById(parentId)
      .populate('enfantsInscrits')
      .lean();

    res.status(200).json({
      message: 'Enfant ajouté au parent avec succès.',
      parent: updatedParent,
    });
  } catch (err) {
    console.error('addChild error:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


exports.getChildren = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await Parent.findById(parentId)
      .populate('enfantsInscrits')
      .lean();

    if (!parent) {
      return res.status(404).json({ message: 'Parent introuvable.' });
    }

    res.json(parent.enfantsInscrits || []);
  } catch (err) {
    console.error('getChildren error:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


exports.getRequestsForChildren = async (req, res) => {
  try {
    const { parentId } = req.params;

    const parent = await Parent.findById(parentId).lean();
    if (!parent) {
      return res.status(404).json({ message: 'Parent introuvable.' });
    }

    if (!parent.enfantsInscrits || parent.enfantsInscrits.length === 0) {
      return res.json([]);
    }

    const requests = await GiftRequest.find({
      userId: { $in: parent.enfantsInscrits },
    })
      .populate('userId')
      .lean()
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    console.error('getRequestsForChildren error:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};
