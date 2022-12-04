import { rest } from "msw";
import { member } from "../data/members";

const membersHandlers = [
  rest.get("/members", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(member));
  }),
  rest.patch("/members", (req, res, ctx) => {
    const newMember = req.body;
    return res(ctx.status(200), ctx.json(newMember));
  }),
];

export { membersHandlers };
