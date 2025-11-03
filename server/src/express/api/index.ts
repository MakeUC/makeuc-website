import { Router } from "express";

import { utilitiesRouter } from "./utilities";


const apiRouter = Router();

apiRouter.use("/utilities", utilitiesRouter);

export { apiRouter };


