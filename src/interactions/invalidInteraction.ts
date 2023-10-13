import { Trigger } from "../Trigger";

export function handleIvalidInteraction(triggerEvent: Trigger): void {
  triggerEvent.setResponseCode(418);
  triggerEvent.setResponseBody("Invalid Interation Type!");
}
