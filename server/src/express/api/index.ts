import { Router } from "express";


import { citiesHandler } from "./cities";
import { countriesHandler } from "./countries";
import { utilitiesRouter } from "./utilities";



const apiRouter = Router();

apiRouter.use("/utilities", utilitiesRouter);
apiRouter.get("/cities", citiesHandler);
apiRouter.get("/countries", countriesHandler);

export { apiRouter };
