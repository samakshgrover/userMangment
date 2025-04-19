import { Router } from "express";

import {
	getCompany,
	getCompanies,
	createCompany,
	updateCompany,
	deleteCompany,
} from "./controller";

export const companyRouter = Router()
	.get("/all", getCompanies)
	.get("/:companyId", getCompany)
	.post("/", createCompany)
	.patch("/", updateCompany)
	.delete("/:companyId", deleteCompany);
