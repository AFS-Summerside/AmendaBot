import { interactionType } from "./interactionType";
import { choices } from "./choices";

export type options = {
  name: string;
  description: string;
  type: interactionType;
  required: boolean;
  choices: choices[];
};
