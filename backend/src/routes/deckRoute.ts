import { Router } from "express";
import { authToken } from "../utils/middleware";
import deckController from "../controllers/deckController";

const deckRouter = Router();

deckRouter.route('/alluserdecks')
.get(authToken, deckController.getAllUsersDecksHandler);

deckRouter.route('/')
.get(authToken, deckController.getAllSharedDecksHandler)
.post(authToken, deckController.createDeckHandler);

deckRouter.route('/:id')
.get(authToken, deckController.getSingleDeckHandler)
.patch()
.delete(authToken, deckController.deleteDeckHandler);

export default deckRouter;