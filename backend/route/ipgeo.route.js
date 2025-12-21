import { Router } from "express";
import { createIpGeo } from "../controller/ipgeo.controller.js";

const ipgeoRouter = Router();

ipgeoRouter.post('/', createIpGeo);

export default ipgeoRouter;