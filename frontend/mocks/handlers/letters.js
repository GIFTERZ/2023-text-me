import { rest } from "msw";
import { letters } from "../data/letters";

const lettersHandlers = [
  rest.get("/letters", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(letters));
  }),
  rest.get("/letters/:id", (req, res, ctx) => {
    const id = Number(req.params.id);
    const letter = letters.find((value) => value.id === id);
    return res(ctx.status(200), ctx.json(letter));
  }),
];

export { lettersHandlers };
