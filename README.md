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
│  │  │   ├─ auth.controller.ts
│  │  │   ├─ auth.service.ts
│  │  │   ├─ auth.routes.ts
│  │  │   ├─ auth.validation.ts
│  │  │   └─ auth.types.ts
│  │  │
│  │  ├─ users/              # Gestion utilisateurs
│  │  │   ├─ user.controller.ts
│  │  │   ├─ user.service.ts
│  │  │   ├─ user.routes.ts
│  │  │   ├─ user.validation.ts
│  │  │   └─ user.types.ts
│  │  │
│  │  ├─ agencies/           # CRUD agences
│  │  │   ├─ agency.controller.ts
│  │  │   ├─ agency.service.ts
│  │  │   ├─ agency.routes.ts
│  │  │   ├─ agency.validation.ts
│  │  │   └─ agency.types.ts
│  │  │
│  │  ├─ trips/              # BusTrip + TrainTrip
│  │  │   ├─ trip.controller.ts
│  │  │   ├─ trip.service.ts
│  │  │   ├─ trip.routes.ts
│  │  │   ├─ trip.validation.ts
│  │  │   └─ trip.types.ts
│  │  │
│  │  ├─ bookings/           # Réservations
│  │  │   ├─ booking.controller.ts
│  │  │   ├─ booking.service.ts
│  │  │   ├─ booking.routes.ts
│  │  │   ├─ booking.validation.ts
│  │  │   └─ booking.types.ts
│  │  │
│  │  ├─ packages/           # Colis
│  │  │   ├─ package.controller.ts
│  │  │   ├─ package.service.ts
│  │  │   ├─ package.routes.ts
│  │  │   ├─ package.validation.ts
│  │  │   └─ package.types.ts
│  │  │
│  │  ├─ payments/           # Paiement
│  │  │   ├─ payment.controller.ts
│  │  │   ├─ payment.service.ts
│  │  │   ├─ payment.routes.ts
│  │  │   ├─ payment.validation.ts
│  │  │   └─ payment.types.ts
│  │  │
│  │  └─ notifications/      # Emails / notifications
│  │      ├─ notification.controller.ts
│  │      ├─ notification.service.ts
│  │      ├─ notification.routes.ts
│  │      ├─ notification.validation.ts
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

