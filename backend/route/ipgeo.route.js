import { Router } from "express";
import { createIpGeo } from "../controller/ipgeo.controller.js";

const ipgeoRouter = Router();

ipgeoRouter.post('/ipgeo', createIpGeo);

export default ipgeoRouter;