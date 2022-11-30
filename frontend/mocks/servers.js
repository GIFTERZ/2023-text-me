import { setupServer } from "msw/node";
import { roomHandlers } from "./handlers/room";
export const server = setupServer(...roomHandlers);
