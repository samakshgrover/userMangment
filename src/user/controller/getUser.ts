import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

const schema = z.object({
	userId: z.coerce
		.number()
		.int({ message: "UserId should be a valid Integer" }),
});

export const getUser = async (req: Request, res: Response) => {
	try {
		const { userId } = schema.parse(req.params);
		const user = await prisma.user.findFirst({
			where: { id: userId },
		});

		// TODO: can threw custom error from here
		// that should be catch from any global error handler.
		if (!user) {
			res
				.status(400)
				.json({ success: false, message: "No user found with this userId" });
		} else {
			res.status(200).json({
				success: true,
				message: "User found",
				user,
			});
		}
	} catch (e) {}
};
