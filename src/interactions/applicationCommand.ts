import { Trigger } from "../Trigger";
import { handleIvalidInteraction } from "./invalidInteraction";

export function handleApplicationCommand(triggerEvent: Trigger): void {
  handleIvalidInteraction(triggerEvent);
}
