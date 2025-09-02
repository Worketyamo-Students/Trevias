import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import errorHandler from "./middlewares/errorHandler";
// import authRoutes from "./modules/auth/auth.routes";
// import userRoutes from "./modules/users/user.routes";
// import agencyRoutes from "./modules/agencies/agency.routes";
// import tripRoutes from "./modules/trips/trip.routes";
// import bookingRoutes from "./modules/bookings/booking.routes";
// import packageRoutes from "./modules/packages/package.routes";
// import paymentRoutes from "./modules/payments/payment.routes";
// import notificationRoutes from "./modules/notifications/notification.routes";
dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/agencies", agencyRoutes);
// app.use("/api/trips", tripRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/packages", packageRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/notifications", notificationRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
})

app.use(errorHandler);

export default app;