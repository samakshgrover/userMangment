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
	.post("/", createUser)
	.patch("/", updateUser)
	.delete("/:userId", deleteUser);
