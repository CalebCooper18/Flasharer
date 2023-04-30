import { Router } from "express";

const deckRouter = Router();

deckRouter.get('/decks');

deckRouter.route('/deck')
.get()
.post()

deckRouter.route('/deck:id')
.get()
.patch()
.delete()

export default deckRouter;