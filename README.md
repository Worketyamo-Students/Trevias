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

