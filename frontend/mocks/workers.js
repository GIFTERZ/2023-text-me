import { setupWorker } from "msw";
import { roomHandlers } from "./handlers/room";
import { lettersHandlers } from "./handlers/letters";
import { membersHandlers } from "./handlers/members";

export const worker = setupWorker(
  ...roomHandlers,
  ...lettersHandlers,
  ...membersHandlers
);
