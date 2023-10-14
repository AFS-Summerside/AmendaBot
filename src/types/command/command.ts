import { interactionType } from "../interactionType";
import { commandName } from "./commandName";
import { options } from "./options";

export type command = {
  id: number;
  name: commandName;
  type: interactionType;
  description: string;
  options: options[];
};
