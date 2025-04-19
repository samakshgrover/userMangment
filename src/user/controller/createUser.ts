import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { prisma } from "../../packages/db";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";
import { handleZodError } from "../../packages/error/zodErrorHandler";

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	companyName: z.string(),
});
export const createUser = async (req: Request, res: Response) => {
	try {
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
	} catch (e) {
		if (e instanceof ZodError) res.status(400).json(handleZodError(e));
		else throw e;
	}
};
