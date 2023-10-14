import { applicationCommandData } from "./applicationCommandData";
import { applicationCommandType } from "./applicationCommandTypes";
import { resolvedData } from "./resolvedData";

export type applicationCommand = {
  id: number;
  name: string;
  type: applicationCommandType;
  resolved?: resolvedData;
  options?: applicationCommandData[];
  guild_id?: number;
  target_id?: number;
};
