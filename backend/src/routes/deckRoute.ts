import { Router } from "express";
import { authToken } from "../utils/middleware";
import deckController from "../controllers/deckController";

const deckRouter = Router();

deckRouter.route('/all')
.get(deckController.getAllSharedDecks);

deckRouter.route('/')
.get()
.post(authToken, deckController.createDeck);

deckRouter.route('/:id')
.get()
.patch()
.delete(authToken, deckController.deleteDeck);

export default deckRouter;