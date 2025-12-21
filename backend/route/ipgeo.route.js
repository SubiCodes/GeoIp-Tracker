import { Router } from "express";
import { createIpGeo, getUserIpGeos, updateIpGeo } from "../controller/ipgeo.controller.js";

const ipgeoRouter = Router();

ipgeoRouter.post('/', createIpGeo);
ipgeoRouter.get('/', getUserIpGeos);
ipgeoRouter.put('/', updateIpGeo);

export default ipgeoRouter;