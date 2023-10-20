import { applicationCommand } from "./applicationCommand";
import { interactionType } from "./interactionType";

export type interaction = {
  id: number;
  application_id: number;
  type: interactionType;
  data?: applicationCommand;
  guild_id?: number;
  channel?: object;
  channel_id?: number;
  member?: object;
  user?: object;
  token: string;
  version: number;
  message?: object;
  app_permissions?: string;
  locale?: string;
  guild_locale?: string;
  entitlements: object[];
};
