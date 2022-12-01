import { setupServer } from "msw/node";
import { roomHandlers } from "./handlers/room";
import { lettersHandlers } from "./handlers/letters";
export const server = setupServer(...roomHandlers, ...lettersHandlers);
