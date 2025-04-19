import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../../packages/db";

const schema = z.object({
	companyId: z.coerce
		.number()
		.int({ message: "UserId should be a valid Integer" }),
});

export const deleteCompany = async (req: Request, res: Response) => {
	try {
		const { companyId } = schema.parse(req.params);
		const company = await prisma.company.delete({
			where: { id: companyId },
		});

		res
			.status(200)
			.json({ success: true, message: "Company deleted successfully" });
	} catch (e) {
		res.status(500).json({ success: false, message: "Something went wrong" });
	}
};
