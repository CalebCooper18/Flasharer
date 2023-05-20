import { Router } from "express";
import { authToken, checkDeckOwnerShip } from "../utils/middleware";
import deckController from "../controllers/deckController";

const deckRouter = Router();

deckRouter.route('/mydecks')
.get(authToken, deckController.getAllUsersDecksHandler);

deckRouter.route('/')
.get(authToken, deckController.getAllSharedDecksHandler)
.post(authToken, deckController.createDeckHandler);

deckRouter.route('/:id')
.get(authToken, deckController.getSingleDeckHandler)
.put(authToken, checkDeckOwnerShip, deckController.updateDeckHandler)
.delete(authToken, checkDeckOwnerShip, deckController.deleteDeckHandler);


deckRouter.route('/:id/likes')
.patch(authToken, deckController.updateLikesDeckHandler);



//** No longer need these routes as we'll be updating the entire deck rather than individual pieces of the deck  */
// deckRouter.route('/:id/shared')
// .patch(authToken, checkDeckOwnerShip, deckController.updateShareDeckHandler);

// deckRouter.route('/:id/cards/:cardId')
// .delete(authToken, checkDeckOwnerShip, deckController.deleteCardHandler)
// .patch(authToken, checkDeckOwnerShip, deckController.updateCardHandler);


// deckRouter.route('/:id/cards')
// .post(authToken, checkDeckOwnerShip, deckController.addCardHandler);

export default deckRouter;