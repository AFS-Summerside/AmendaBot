import { user } from "./user";

export type resolvedData = {
  users?: Map<string, user>;
  members?: Map<string, object>;
  roles?: Map<number, object>;
  channels?: Map<number, object>;
  messages?: Map<number, object>;
  arrachments?: Map<number, object>;
};
