import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

const schema = z.object({
	id: z.number().int(),
	name: z.string().optional(),
	license: z.string().optional(),
	address: z.string().optional(),
});
export const updateCompany = async (req: Request, res: Response) => {
	const { name, license, address, id } = schema.parse(req.body);

	const company = await prisma.company.update({
		where: { id },
		data: { name, address, license },
	});

	res
		.status(200)
		.json({ success: true, message: "user updated successfully", company });
};
