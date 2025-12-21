import { Router } from "express";
import { createIpGeo, deleteIpGeo, getUserIpGeos, updateIpGeo } from "../controller/ipgeo.controller.js";

const ipgeoRouter = Router();

ipgeoRouter.post('/', createIpGeo);
ipgeoRouter.get('/', getUserIpGeos);
ipgeoRouter.put('/', updateIpGeo);
ipgeoRouter.delete('/', deleteIpGeo);

export default ipgeoRouter;