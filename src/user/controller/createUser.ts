import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	companyName: z.string(),
});
export const createUser = async (req: Request, res: Response) => {
	const { firstName, lastName, companyName } = schema.parse(req.body);

	const user = await prisma.user.create({
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
		.json({ success: true, message: "user create successfully", user });
};
