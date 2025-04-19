import { Router } from "express";

import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from "./controller";

export const userRouter = Router()
	.get("/all", getUsers)
	.get("/:userId", getUser)
	.post("/user", createUser)
	.patch("/user", updateUser)
	.delete("user/:userId", deleteUser);
