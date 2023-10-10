import { Trigger } from "../Trigger";
import { handleIvalidInteraction } from "./invalidInteraction";

export function handleApplicationCommandAutocomplete(triggerEvent: Trigger): void {
  handleIvalidInteraction(triggerEvent);
}
