import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { prisma } from "../../packages/db";
import { handleZodError } from "../../packages/error/zodErrorHandler";
import { PrismaClientKnownRequestError } from "../../../generated/prisma/runtime/library";

const schema = z.object({
	name: z.string(),
	license: z.string(),
	address: z.string(),
});

export const createCompany = async (req: Request, res: Response) => {
	try {
		const { name, license, address } = schema.parse(req.body);

		const company = await prisma.company.create({
			data: { name, address, license },
		});

		res
			.status(200)
			.json({ success: true, message: "user create successfully", company });
	} catch (e) {
		if (e instanceof ZodError) res.status(400).json(handleZodError(e));
		else if (e instanceof PrismaClientKnownRequestError) {
			console.log(Object.entries(e));
			if (e.code == "P2002") {
				const message = `unique constraint failed on ${e.meta!.modelName}`;
				res.status(400).json({ success: false, message });
				console.log(JSON.stringify(e.meta));
			}
			throw e;
		} else throw e;
	}
};
