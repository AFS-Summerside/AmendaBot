import { applicationCommandType } from "./applicationCommandTypes";

export type applicationCommandData = {
  name: string;
  type: applicationCommandType;
  value?: string | number | boolean;
  options?: applicationCommandData[];
  focused?: boolean;
};
