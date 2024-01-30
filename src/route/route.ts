import { Router } from "express";
import { URLAnalytics, createUrl, redirectURL } from "../controller/controller";

export const route = Router();

route.post("/create", createUrl);
route.get("/:shortId", redirectURL);
route.get("/analytics/:shortId", URLAnalytics);
