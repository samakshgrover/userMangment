import { ZodError } from "zod";

export const handleZodError = (e: ZodError) => {
	const error = e.errors[0];
	return {
		path: error.path.join("."),
		code: error.code,
		message: error.message,
	};
};
