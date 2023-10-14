import { Trigger } from "../Trigger";
import { interactionType } from "../types/interactionType";

const responseBody = {
  type: interactionType.PING,
};

export function handlePing(triggerEvent: Trigger) {
  triggerEvent.setResponseCode(200);
  triggerEvent.setResponseBody(JSON.stringify(responseBody));
}
