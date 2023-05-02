import { Router } from "express";
import { authToken } from "../utils/middleware";
import deckController from "../controllers/deckController";

const deckRouter = Router();

deckRouter.route('/all')
.get(deckController.getAllSharedDecksHandler);

deckRouter.route('/')
.get()
.post(authToken, deckController.createDeckHandler);

deckRouter.route('/:id')
.get()
.patch()
.delete(authToken, deckController.deleteDeckHandler);

export default deckRouter;