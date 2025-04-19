import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

const schema = z.object({
	userId: z.coerce
		.number()
		.int({ message: "UserId should be a valid Integer" }),
});

export const deleteUser = async (req: Request, res: Response) => {
	const { userId } = schema.parse(req.params);
	const user = await prisma.user.delete({
		where: { id: userId },
	});

	res.status(200).json({ success: true, message: "User deleted successfully" });
};
