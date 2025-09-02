# Trevias - Au service de vos réservations

Plateforme de réservation de billets (bus & train) et gestion logistique colis —
Cameroon.

---

## Backend 

### 📁 Structure du projet

```bash 

backend/
├─ prisma/
│  ├─ schema.prisma          # Définition des modèles Prisma
│  └─ index.ts                # Données initiales (agences, admin)
│
├─ src/
│  ├─ config/
│  │  ├─ db.ts               # Connexion Prisma
│  │  ├─ cloudflare.ts       # Config Cloudflare API
│  │  └─ mail.ts             # Config email SMTP
│  │
│  ├─ middlewares/
│  │  ├─ auth.ts             # Vérification JWT
│  │  ├─ errorHandler.ts     # Gestion des erreurs globales
│  │  └─ validate.ts         # Validation JOI/Zod
│  │
│  ├─ modules/
│  │  ├─ auth/               # Authentification
│  │  │   ├─ auth.controller.ts       # Logique des endpoints (register, login, logout, social auth)
│  │  │   ├─ auth.service.ts          # Méthodes métiers (hash mdp, création JWT, OAuth)
│  │  │   ├─ auth.routes.ts           # Routes /api/auth/*
│  │  │   ├─ auth.validation.ts       # Schémas Joi/Zod pour register/login
│  │  │   └─ auth.types.ts            # Interfaces TS (payload, token, etc.)
│  │  │
│  │  ├─ users/              # Gestion utilisateurs
│  │  │   ├─ user.controller.ts       # CRUD user (profile, update, delete)
│  │  │   ├─ user.service.ts          # Logique (db calls via Prisma)
│  │  │   ├─ user.routes.ts           # Routes /api/users/*
│  │  │   ├─ user.validation.ts       # Validation input
│  │  │   └─ user.types.ts            # Interfaces utilisateur
│  │  │
│  │  ├─ agencies/           # CRUD agences
│  │  │   ├─ agency.controller.ts
│  │  │   ├─ agency.service.ts
│  │  │   ├─ agency.routes.ts         # /api/agencies/*
│  │  │   ├─ agency.validation.ts
│  │  │   └─ agency.types.ts
│  │  │
│  │  ├─ trips/              # BusTrip + TrainTrip
│  │  │   ├─ trip.controller.ts       # Créer un trip, voir les trips, dispo
│  │  │   ├─ trip.service.ts
│  │  │   ├─ trip.routes.ts           # /api/trips/*
│  │  │   ├─ trip.validation.ts
│  │  │   └─ trip.types.ts
│  │  │
│  │  ├─ bookings/           # Réservations
│  │  │   ├─ booking.controller.ts
│  │  │   ├─ booking.service.ts
│  │  │   ├─ booking.routes.ts         # /api/bookings/*    
│  │  │   ├─ booking.validation.ts
│  │  │   └─ booking.types.ts
│  │  │
│  │  ├─ packages/           # Colis
│  │  │   ├─ package.controller.ts
│  │  │   ├─ package.service.ts
│  │  │   ├─ package.routes.ts         # /api/packages/*
│  │  │   ├─ package.validation.ts
│  │  │   └─ package.types.ts
│  │  │
│  │  ├─ payments/           # Paiement
│  │  │   ├─ payment.controller.ts     # Vérification transaction, webhook
│  │  │   ├─ payment.service.ts 
│  │  │   ├─ payment.routes.ts         # /api/payments/*
│  │  │   ├─ payment.validation.ts
│  │  │   └─ payment.types.ts
│  │  │
│  │  └─ notifications/      # Emails / notifications
│  │      ├─ notification.controller.ts
│  │      ├─ notification.service.ts   # Envoi email, sms
│  │      ├─ notification.routes.ts    # /api/notifications/*
│  │      └─ notification.types.ts
│  │
│  ├─ utils/
│  │  ├─ logger.ts           # Winston logger
│  │  ├─ response.ts         # Uniformiser réponses JSON
│  │  └─ helpers.ts
│  │
│  ├─ app.ts                 # App Express principale (routes + middlewares)
│  └─ server.ts              # Lancement du serveur
│
├─ package.json
├─ tsconfig.json
├─ .env
├─ README.md
├─ Dockerfile
└─ docker-compose.yml

```

## Chronologie de codage 

---

### **1. Base technique**

* Configurer **`src/app.ts`** et **`src/server.ts`** → Express, middlewares globaux (`errorHandler`, `validate`, `logger`).
* Vérifier la connexion Prisma (`db.ts`).
* Créer ton routeur principal qui va monter `/api/*`.

---

### **2. Authentification & Utilisateurs**

* **`modules/auth`**

  * `auth.routes.ts` avec `/register`, `/login`, `/logout`, éventuellement `/social-auth`.
  * Gestion des tokens JWT + refresh.
* **`modules/users`**

  * `GET /users/:id` → voir profil.
  * `PATCH /users/:id` → update profil.
  * `DELETE /users/:id` → suppression.
  * Validation des rôles (ex. seul un admin peut supprimer un user).

> 💡 Tu sécurises tout de suite ton système : sans **authentification + user**, impossible d’aller plus loin.

---

### **3. Agences**

* **`modules/agencies`**

  * `POST /agencies` → créer une agence (réservé ADMIN).
  * `GET /agencies` → lister.
  * `GET /agencies/:id` → détails.
  * `PATCH /agencies/:id` → mise à jour.
  * `DELETE /agencies/:id` → suppression.

> Tu poses les bases pour relier les trips et les colis.

---

### **4. Trips (BusTrip + TrainTrip)**

* **`modules/trips`**

  * `POST /trips/bus` et `/trips/train` → création de trajets (par agences).
  * `GET /trips` → liste de tous les trajets (filtre bus/train/from/to).
  * `GET /trips/:id` → détails d’un trajet.
  * `PATCH /trips/:id` → modification.
  * `DELETE /trips/:id`.

> Ici tu peux déjà avoir un moteur de recherche simple **ville de départ / arrivée / date**.

---

### **5. Bookings (réservations)**

* **`modules/bookings`**

  * `POST /bookings` → réserver un siège sur un bus/train.
  * `GET /bookings/me` → voir mes réservations.
  * `PATCH /bookings/:id/cancel` → annuler.
  * `PATCH /bookings/:id/confirm` → confirmer (par admin/agence).

> À ce stade, tu as un vrai **workflow utilisateur** : inscription → rechercher trajet → réserver.

---

### **6. Paiements**

* **`modules/payments`**

  * `POST /payments/initiate` → initier un paiement (mobile money, carte).
  * `POST /payments/webhook` → callback opérateur.
  * `GET /payments/:id` → état du paiement.

> Tu lies ici avec `Booking` pour marquer une réservation comme **confirmée** seulement si paiement **SUCCESS**.

---

### **7. Packages (envoi de colis)**

* **`modules/packages`**

  * `POST /packages` → créer un envoi (user → agence).
  * `GET /packages/me` → mes colis.
  * `PATCH /packages/:id/status` → suivi du colis (in\_transit, livré).

> Ici, tu réutilises la logique d’agence et utilisateur.

---

### **8. Notifications**

* **`modules/notifications`**

  * `POST /notifications` → créer une notif (système interne ou admin → user).
  * `GET /notifications/me` → voir mes notifs.
  * `PATCH /notifications/:id/read` → marquer comme lu.

> Relié avec `mail.ts` pour envoyer email, et peut évoluer vers **push SMS/WhatsApp**.

---

### **9. Extras & Optimisation**

* Logger (`utils/logger.ts`) → centraliser logs.
* Response handler (`utils/response.ts`) → uniformiser JSON.
* Middlewares avancés (rate-limiter, cors, etc.).
* Tests unitaires (Jest).
* Dockerisation (Dockerfile + docker-compose).

---

✅ Donc la **bonne chronologie** c’est :

1. Base technique (server + prisma + app).
2. Authentification + Users.
3. Agences.
4. Trips.
5. Bookings.
6. Paiements.
7. Packages.
8. Notifications.
9. Extras (optimisation, sécurité, logs, tests).

---

## Diagramme de dépendances

```pgsql

               +-------------------+
               |   Auth & Users    |
               |  (register, login)|
               +-------------------+
                         |
                         v
               +-------------------+
               |     Agencies      |
               | (CRUD agences)    |
               +-------------------+
                         |
                         v
               +-------------------+
               |       Trips       |
               | (bus/train)       |
               +-------------------+
                         |
                         v
               +-------------------+
               |     Bookings      |
               | (réservations)    |
               +-------------------+
                         |
                         v
               +-------------------+
               |     Payments      |
               | (Momo/Card, etc.) |
               +-------------------+
                         |
                         v
               +-------------------+
               |   Notifications   |
               | (email, sms, app) |
               +-------------------+

    +-------------------+             +-------------------+
    |     Packages      | <---------  |     Agencies      |
    | (colis transport) |             | (relation agence) |
    +-------------------+             +-------------------+

```

---

### Explications

1. Auth & Users : point d’entrée → sans utilisateur authentifié, rien ne peut être réservé ou payé.

2. Agencies : nécessaires avant de créer des trips ou des colis (un trip appartient à une agence, un colis est envoyé via une agence).

3. Trips : liés aux agences. Ils fournissent la base des réservations.

4. Bookings : liés à un User + un Trip.

5. Payments : liés à un Booking. Ils permettent de valider ou non la réservation.

6. Packages : liés à User + Agency. Ce module peut évoluer indépendamment des réservations.

7. Notifications : module transverse → déclenchées à chaque action clé (création de compte, réservation, paiement réussi, colis livré).

---

### Flux typique (use case voyageur)

1. Un user s’inscrit/login.

2. Il consulte les agences et les trips disponibles.

3. Il réserve un trip (booking).

4. Il paie la réservation (payment).

5. Il reçoit une notification de confirmation.

