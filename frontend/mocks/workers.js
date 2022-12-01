import { setupWorker } from "msw";
import { roomHandlers } from "./handlers/room";
import { lettersHandlers } from "./handlers/letters";

export const worker = setupWorker(...roomHandlers, ...lettersHandlers);
