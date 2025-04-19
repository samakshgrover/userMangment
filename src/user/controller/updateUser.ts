import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { prisma } from "../../packages/db";
import { handleZodError } from "../../packages/error/zodErrorHandler";

const schema = z.object({
	id: z.number(),
	firstName: z.string().optional(),
	lastName: z.string().optional(),
	companyName: z.string().optional(),
});

// TODO: error handling
export const updateUser = async (req: Request, res: Response) => {
	try {
		const { id, firstName, lastName, companyName } = schema.parse(req.body);

		const user = await prisma.user.update({
			where: { id },
			data: {
				firstName,
				lastName,
				...(companyName && { company: { connect: { name: companyName } } }),
			},
		});

		res
			.status(200)
			.json({ success: true, message: "Update user successfully", user });
	} catch (e) {
		if (e instanceof ZodError) res.status(400).json(handleZodError(e));
		else throw e;
	}
};
