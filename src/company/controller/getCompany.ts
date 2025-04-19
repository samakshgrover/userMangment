import { Request, Response } from "express";
import { z, ZodError } from "zod";
import { prisma } from "../../packages/db";
import { handleZodError } from "../../packages/error/zodErrorHandler";

const schema = z.object({
	companyId: z.coerce
		.number()
		.int({ message: "UserId should be a valid Integer" }),
});

export const getCompany = async (req: Request, res: Response) => {
	try {
		const { companyId } = schema.parse(req.params);
		const company = await prisma.company.findFirst({
			where: { id: companyId },
		});

		// TODO: can threw custom error from here
		// that should be catch from any global error handler.
		if (!company) {
			res
				.status(400)
				.json({ success: false, message: "No company found with this userId" });
		} else {
			res.status(200).json({
				success: true,
				message: "Company found",
				company,
			});
		}
	} catch (e) {
		if (e instanceof ZodError) res.status(400).json(handleZodError(e));
		else throw e;
	}
};
