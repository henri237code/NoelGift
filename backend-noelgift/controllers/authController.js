const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Parent = require('../models/Parent');


exports.register = async (req, res) => {
  try {
    const { nom, prenom, age, pays, ville, username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Nom d’utilisateur déjà pris' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nom,
      prenom,
      age,
      pays,
      ville,
      username,
      password: hashedPassword
    });

    res.status(201).json({ message: 'Inscription réussie', user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (
      username === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.status(200).json({
        message: 'Connexion admin réussie',
        role: 'admin',
        token,
      });
    }

    const parent = await Parent.findOne({ username });
    if (parent) {
      const isMatch = await bcrypt.compare(password, parent.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: parent._id, role: 'parent' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(200).json({
        message: 'Connexion parent réussie',
        role: 'parent',
        token,
        parent,
      });
    }

    const user = await User.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrect' });
      }

      const token = jwt.sign(
        { id: user._id, role: 'user' },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      return res.status(200).json({
        message: 'Connexion réussie',
        role: 'user',
        token,
        user,
      });
    }

    return res.status(404).json({ message: 'Aucun compte trouvé avec cet identifiant.' });

  } catch (error) {
    console.error('Erreur login:', error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};



exports.registerParent = async (req, res) => {
  try {
    const { nom, prenom, pays, ville, username, password } = req.body;

    if (!nom || !prenom || !pays || !ville || !username || !password) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    const exists = await Parent.findOne({ username });
    if (exists) {
      return res.status(400).json({ message: "Nom d'utilisateur déjà utilisé." });
    }

    const hash = await bcrypt.hash(password, 10);

    const parent = await Parent.create({
      nom,
      prenom,
      pays,
      ville,
      username,
      password: hash,
      enfantsInscrits: [],
    });

    const token = jwt.sign({ id: parent._id, role: 'parent' }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Inscription parent réussie',
      parent,
      token,
      role: 'parent',
    });
  } catch (err) {
    console.error('Erreur registerParent:', err);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};

