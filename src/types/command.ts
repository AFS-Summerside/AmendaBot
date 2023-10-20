import { interactionType } from "./interactionType";
import { commandName } from "./commandName";
import { option } from "./option";

export type command = {
  id: number;
  name: commandName;
  type: interactionType;
  description: string;
  options: option[];
};
