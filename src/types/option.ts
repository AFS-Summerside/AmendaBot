import { choices } from "./choice";
import { interactionType } from "./interactionType";

export type option = {
  name: string;
  description: string;
  type: interactionType;
  required: boolean;
  choices: choices[];
};
