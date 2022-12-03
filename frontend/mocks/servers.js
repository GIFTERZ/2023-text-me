import { setupServer } from "msw/node";
import { roomHandlers } from "./handlers/room";
import { lettersHandlers } from "./handlers/letters";
import { membersHandlers } from "./handlers/members";

export const server = setupServer(
  ...roomHandlers,
  ...lettersHandlers,
  ...membersHandlers
);
