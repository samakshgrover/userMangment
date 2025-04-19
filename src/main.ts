import express from "express";
import { companyRouter } from "./company/router";
import { userRouter } from "./user/router";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/user", userRouter);
app.use("/company", companyRouter);

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}`);
});
