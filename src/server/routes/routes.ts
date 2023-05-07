import { Router } from "express";
import controller from "../controller/controller";

const router = Router();

router.get('/users', controller.getUsers);

router.get('/phrases',controller.getPhrases);

export default router;
