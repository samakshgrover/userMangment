import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await prisma.user.findMany();

		// TODO: can threw custom error from here
		// that should be catch from any global error handler.

		res.status(200).json({
			success: true,
			users,
		});
	} catch (e) {
		throw e;
	}
};
