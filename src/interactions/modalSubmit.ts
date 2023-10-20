import { Trigger } from "../trigger/Trigger";
import { handleIvalidInteraction } from "./invalidInteraction";

export function handleModalSubmit(triggerEvent: Trigger): void {
  handleIvalidInteraction(triggerEvent);
}
