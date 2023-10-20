import { Trigger } from "../trigger/Trigger";
import { handleIvalidInteraction } from "./invalidInteraction";

export function handleMessageComponent(triggerEvent: Trigger): void {
  handleIvalidInteraction(triggerEvent);
}
