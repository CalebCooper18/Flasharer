import { Router } from "express";
import { authToken, checkDeckOwnerShip } from "../utils/middleware";
import deckController from "../controllers/deckController";

const deckRouter = Router();

deckRouter.route('/alluserdecks')
.get(authToken, deckController.getAllUsersDecksHandler);

deckRouter.route('/')
.get(authToken, deckController.getAllSharedDecksHandler)
.post(authToken, deckController.createDeckHandler);

deckRouter.route('/:id')
.get(authToken, deckController.getSingleDeckHandler)
.delete(authToken, checkDeckOwnerShip, deckController.deleteDeckHandler);

deckRouter.route('/:id/shared')
.patch(authToken, checkDeckOwnerShip, deckController.updateShareDeckHandler);

deckRouter.route('/:id/likes')
.patch(authToken, deckController.updateLikesDeckHandler);

deckRouter.route('/:id/cards/:cardId')
.delete(authToken, checkDeckOwnerShip, deckController.deleteCardHandler);


export default deckRouter;