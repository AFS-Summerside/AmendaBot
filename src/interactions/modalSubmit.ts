import { Trigger } from "../Trigger";
import { handleIvalidInteraction } from "./invalidInteraction";

export function handleModalSubmit(triggerEvent: Trigger): void {
  handleIvalidInteraction(triggerEvent);
}
