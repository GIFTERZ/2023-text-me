import { setupServer } from 'msw/node';
import { roomHandlers } from './handlers/room';
import { lettersHandlers } from './handlers/letters';
import { membersHandlers } from './handlers/members';
import { cardsHandlers } from './handlers/cards';

export const server = setupServer(...roomHandlers, ...lettersHandlers, ...membersHandlers, ...cardsHandlers);
