import { rest } from "msw";
import { letters } from "../data/letters";

const lettersHandlers = [
  rest.get("/letters", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(letters));
  }),
];

export { lettersHandlers };
