import { rest } from "msw";

const roomHandlers = [
  rest.post("/room", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ roomId: 1 }));
  }),
  rest.get("/room", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ownerName: "김채은" }));
  }),
];

export { roomHandlers };
