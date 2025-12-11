# NoelGift
Donne la possibilité aux enfant de demander des cadeaux à un  père noël  virtuel  , des parent peut décidé de s'en occupé.



NOELGIFT — Plateforme de gestion des cadeaux de Noël

 Description du projet

NoelGift est une application mobile développée en React Native et connectée à un backend Node.js + MongoDB.
Elle permet à trois types d’utilisateurs d’interagir autour des demandes de cadeaux de Noël :

1. Les Enfants — Ils créent une demande de cadeau (type, nom du cadeau, description).


2. Les Parents — Ils enregistrent leurs enfants, consultent leurs demandes et peuvent s’en occuper eux-mêmes.


3. L’Administrateur (Père Noël) — Il supervise toutes les demandes et met à jour leur statut.



L'objectif du projet est de simuler une plateforme moderne du Père Noël où chaque enfant peut exprimer ses souhaits, et où les parents comme les administrateurs peuvent suivre et traiter ces demandes.


---

 Objectifs du projet

Permettre aux enfants d’envoyer des lettres au Père Noël sous forme numériques.

Créer un espace parent pour gérer les demandes de leurs enfants.

Fournir une interface admin pour traiter efficacement les demandes.

Illustrer une application full-stack moderne avec authentification, base de données et logique de gestion.



---

 Rôles utilisateurs

 1. Enfant

L’enfant peut :

Créer un compte (Nom, Prénom, Âge, Pays, Ville, Pseudo, Mot de passe)

Se connecter

Faire une demande de cadeau (type, nom, description)

Voir toutes ses demandes et leur statut


Chaque demande possède un statut :

pending → À faire

processing → En cours

delivered → Livré



---

 2. Parent

Le parent peut :

S’inscrire en tant que parent (Nom, Prénom, Pays, Ville, Pseudo, Mot de passe)

Se connecter avec son compte parent

Ajouter un enfant existant grâce à son Nom + Prénom + Âge
(validation automatique dans la base de données)

Voir combien d’enfants sont inscrits

Voir les demandes de cadeaux de chacun de ses enfants

Consulter une demande en détail

Si la demande est “À faire”, il peut décider de s’en occuper lui-même
→ redirection vers un site d’achat de jouets



---

 3. Administrateur (Père Noël)

L’admin se connecte via des identifiants définis dans .env.

Il peut :

Voir toutes les demandes de tous les enfants

Voir une demande en détail

Modifier le statut :
  À faire
  En cours
  Livré



---

 Fonctionnement global de l’application

 1. Inscription / Connexion

Trois formulaires distincts existent :

Enfant → /auth/register

Parent → /auth/register-parent

Admin → login avec identifiants .env


L’authentification fonctionne avec JWT.


---

 2. Demande de cadeaux (Enfant)

Un enfant connecté peut envoyer une demande avec :

type

nom du cadeau

description


La demande est enregistrée dans la table giftRequests avec son userId.


---

 3. Dashboard Parent

Le parent connecté voit :

Son profil

Le nombre d’enfants inscrits

Une liste de ses enfants (Nom + âge + nb demandes)

Un bouton Ajouter un enfant (modal de saisie)

Une liste de toutes les demandes des enfants


Lorsqu’il consulte une demande, il voit :

Le type

Le cadeau

La description

Les infos de l’enfant

Le statut

Un bouton “Je m’en occupe moi-même” si statut = pending
→ redirection vers un site de jouets



---

 4. Dashboard Admin

L’admin a accès à :

La liste complète des demandes

Une page détail

Un bouton pour modifier le statut



---

 Architecture Technique

Frontend (React Native)

Navigation : React Navigation

API calls : Axios

Interface simple, moderne et intuitive

Composants pour chaque écran (Enfant, Parent, Admin)


Backend (Node.js + Express)

Routes REST :

/api/auth
/api/gifts
/api/admin
/api/parent

Authentification JWT

Middleware de validation

Gestion des rôles admin / enfant / parent


Base de données (MongoDB Atlas)

Collections :

users → enfants

parents → parents + enfantsInscrits[]

gifts → cadeaux disponibles (seed)

giftRequests → demandes créées par les enfants



---

 Sécurité

Hash des mots de passe avec bcrypt

JWT sécurisé côté serveur

Séparation des rôles

Validation stricte lors de l'ajout d’un enfant

Filtrage backend pour retourner uniquement les données autorisées



---


 Installation & Exécution

Backend

cd backend-noelgift
npm install
npm run dev

Créer un fichier .env :

MONGO_URI=mongodb+srv://…
JWT_SECRET=ton_secret
ADMIN_USER=admin
ADMIN_PASSWORD=superadmin123
PORT=3000


---

Frontend

cd NoelLift
npm install
npm start


---

 Tests basiques

Créer un enfant, se connecter → faire une demande

Créer un parent → ajouter un enfant existant → voir ses demandes

Se connecter en admin → changer statut d’une demande

Recharger écran enfant → voir statut mis à jour

Parent → voir statut mis à jour aussi

Tester redirection vers site de jouets



---

Arborescence principale

backend/
 ├── controllers/
 ├── routes/
 ├── models/
 ├── config/
 ├── app.js
 ├── .env

frontend/
 ├── src/screens/
 ├── src/api/
 ├── src/utils/
 ├── App.js


---

Conclusion

NoelGift est une solution complète illustrant :

un écosystème multi-rôle

une authentification sécurisée

une architecture full-stack

une gestion dynamique des données

une expérience utilisateur fluide


L'application sert aussi d’exemple pédagogique pour démontrer :

la communication frontend ↔ backend

l’usage de MongoDB

le rôle de la validation et des statuts

le traitement conditionnel (parent/admin)