import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import { Trigger } from "./Trigger";
import { interactionType } from "./types/interactionType";
import { handlePing } from "./interactions/ping";
import { handleIvalidInteraction } from "./interactions/invalidInteraction";
import { handleModalSubmit } from "./interactions/modalSubmit";
import { handleApplicationCommand } from "./interactions/applicationCommand";
import { handleApplicationCommandAutocomplete } from "./interactions/applicationCommandAutocomplete";
import { handleMessageComponent } from "./interactions/messageComponent";
import { handleUnauthorizedRequest } from "./interactions/unauthorizedReuqest";
import { response, responseCategory } from "./errors/responseCodes";

// Lambda Handler - gets invoked by trigger
export const handler: Handler = async function (event: APIGatewayProxyEvent) {
  // console.info("Request Recieved >>" + event + "<<")
  const signature = event.headers["x-signature-ed25519"] ?? "";
  const timestamp = event.headers["x-signature-timestamp"] ?? "";
  const strBody = event.body ?? "";

  let triggerEvent = new Trigger(signature, timestamp, strBody);

  //Check signature of request
  if (triggerEvent.isValidCaller()) {
    handleRequest(triggerEvent);
  } else {
    handleUnauthorizedRequest(triggerEvent);
  }

  // logReponse(triggerEvent);

  return {
    statusCode: triggerEvent.getResponseCode,
    body: triggerEvent.getResponseBody,
  };
};

//Handle different request types
function handleRequest(triggerEvent: Trigger) {
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
}
// function logReponse(triggerEvent: Trigger): void {
//   console.log("Reponse code is " + triggerEvent.getResponseCode().code)
//   switch(triggerEvent.getResponseCode().category){
//     case responseCategory.SUCCESSFUL:
//       console.info("Request was Successful!");
//       break;
//     case responseCategory.REDIRECTION:
//       console.warn("Addition action required to faciliate request");
//     case responseCategory.CLIENT_ERROR:
//       console.log("Client Error");
//       console.error("Request Body:" + triggerEvent.getRequestBody());
//       break;
//     case responseCategory.SERVER_ERROR:
//       console.log("Server Error");
//       console.error("Reponse Body:" + triggerEvent.getResponseBody());
//       break;

//   }
// }
