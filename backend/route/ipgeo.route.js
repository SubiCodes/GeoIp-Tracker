import { Router } from "express";
import { createIpGeo, getUserIpGeos } from "../controller/ipgeo.controller.js";

const ipgeoRouter = Router();

ipgeoRouter.post('/', createIpGeo);
ipgeoRouter.get('/', getUserIpGeos);

export default ipgeoRouter;