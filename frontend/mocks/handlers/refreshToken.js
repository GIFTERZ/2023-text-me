import { rest } from "msw";
import { refreshToken } from "../data/refreshToken";

const refreshTokenHandlers = [
  rest.post("/refresh", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(refreshToken));
  }),
];

export { refreshTokenHandlers };
