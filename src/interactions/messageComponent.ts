import { Trigger } from "../Trigger";
import { handleIvalidInteraction } from "./invalidInteraction";

export function handleMessageComponent(triggerEvent: Trigger): void {
  handleIvalidInteraction(triggerEvent);
}
