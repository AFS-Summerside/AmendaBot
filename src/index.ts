import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import { Trigger } from "./Trigger";
import { interactionType } from "./types/type";
import { handlePing } from "./interactions/ping";
import { handleIvalidInteraction } from "./interactions/invalidInteraction";
import { handleModalSubmit } from "./interactions/modalSubmit";
import { handleApplicationCommand } from "./interactions/applicationCommand";
import { handleApplicationCommandAutocomplete } from "./interactions/applicationCommandAutocomplete";
import { handleMessageComponent } from "./interactions/messageComponent";

export const handler: Handler = async function (event: APIGatewayProxyEvent) {
  const signature = event.headers["x-signature-ed25519"] ?? "";
  const timestamp = event.headers["x-signature-timestamp"] ?? "";
  const strBody = event.body ?? "";

  let triggerEvent = new Trigger(signature, timestamp, strBody);

  //Check token against signature
  if (triggerEvent.isValidCaller()) {
    switch (triggerEvent.getRequestBody().interactionType) {
      case interactionType.PING: {
        handlePing(triggerEvent);
        break;
      }
      case interactionType.APPLICATION_COMMAND: {
        handleApplicationCommand(triggerEvent);
        break;
      }
      case interactionType.MESSAGE_COMPONENT: {
        handleMessageComponent(triggerEvent);
        break;
      }
      case interactionType.APPLICATION_COMMAND_AUTOCOMPLETE: {
        handleApplicationCommandAutocomplete(triggerEvent);
        break;
      }
      case interactionType.MODAL_SUBMIT: {
        handleModalSubmit(triggerEvent);
        break;
      }
      default: {
        handleIvalidInteraction(triggerEvent);
        break;
      }
    }

    return {
      statusCode: triggerEvent.getResponseCode,
      body: triggerEvent.getResponseBody,
    };
  }
};
