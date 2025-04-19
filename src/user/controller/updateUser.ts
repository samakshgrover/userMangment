import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

const schema = z.object({
	id: z.number(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	companyName: z.string().optional(),
});

// TODO: error handling
export const updateUser = async (req: Request, res: Response) => {
	const { id, firstName, lastName, companyName } = schema.parse(req.body);

	const user = await prisma.user.update({
		where: { id },
		data: {
			firstName,
			lastName,
			company: {
				connect: {
					name: companyName,
				},
			},
		},
	});

	res
		.status(200)
		.json({ success: true, message: "Update user successfully", user });
};
