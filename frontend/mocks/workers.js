import { setupWorker } from "msw";
import { roomHandlers } from "./handlers/room";

export const worker = setupWorker(...roomHandlers);
