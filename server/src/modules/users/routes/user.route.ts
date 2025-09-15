import { Router } from "express";
import usersCtl from "../controllers/user.ctl.ts";
const userRoutes = Router()


userRoutes.get('/profile/:id', usersCtl.getUsers)
userRoutes.post('/signup',usersCtl.createUser)
userRoutes.post('/login',usersCtl.AuthentificationUser)
userRoutes.put('/profile/:id' ,usersCtl.updateUser)
userRoutes.delete('/:id' ,usersCtl.deleteUser)

export default userRoutes
