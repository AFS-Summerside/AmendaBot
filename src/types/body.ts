import { user } from "./user";

export type body = {
  interactionType: number;
  user: user;
  version: number;
  fullBody: string;
};
