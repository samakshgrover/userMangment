import { Request, Response } from "express";
import { prisma } from "../../packages/db";

export const getCompanies = async (req: Request, res: Response) => {
	try {
		const companies = await prisma.company.findMany();

		// TODO: can threw custom error from here
		// that should be catch from any global error handler.

		res.status(200).json({
			success: true,
			companies,
		});
	} catch (e) {}
};
