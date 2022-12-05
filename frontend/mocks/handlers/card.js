import { rest } from 'msw';
import { cards } from '../data/cards';

const cardsHandlers = [
  rest.get('/cards', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(cards));
  }),
];

export { cardsHandlers };
