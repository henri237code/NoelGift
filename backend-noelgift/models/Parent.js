const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true, trim: true },
    prenom: { type: String, required: true, trim: true },
    pays: { type: String, required: true, trim: true },
    ville: { type: String, required: true, trim: true },

    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, 

    
    enfantsInscrits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Parent', parentSchema);
