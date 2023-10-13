import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import { Trigger } from "./Trigger";
import { interactionType } from "./types/type";
import { handlePing } from "./interactions/ping";
import { handleIvalidInteraction } from "./interactions/invalidInteraction";
import { handleModalSubmit } from "./interactions/modalSubmit";
import { handleApplicationCommand } from "./interactions/applicationCommand";
import { handleApplicationCommandAutocomplete } from "./interactions/applicationCommandAutocomplete";
import { handleMessageComponent } from "./interactions/messageComponent";
import { handleUnauthorizedRequest } from "./interactions/unauthorizedReuqest";

// Lambda Handler - gets invoked by trigger
export const handler: Handler = async function (event: APIGatewayProxyEvent) {
  console.info("Request Recieved >>" + event + "<<")
  const signature = event.headers["x-signature-ed25519"] ?? "";
  const timestamp = event.headers["x-signature-timestamp"] ?? "";
  const strBody = event.body ?? "";

  let triggerEvent = new Trigger(signature, timestamp, strBody);

  //Check signature of request
  if (triggerEvent.isValidCaller()) {
    handleRequest(triggerEvent);
  }
  else{
    handleUnauthorizedRequest(triggerEvent);
  }

  logReponse(triggerEvent);
  
  return {
    statusCode: triggerEvent.getResponseCode,
    body: triggerEvent.getResponseBody,
  };
}

//Handle different request types
function handleRequest(triggerEvent: Trigger){
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
function logReponse(triggerEvent: Trigger): void {
  let rc: number = triggerEvent.getResponseCode();

  switch(true){
    case rc >= 200 && rc <= 299:
      console.info("Request was Successful!");
      break;
    case rc >= 300 && rc <= 399:
      console.warn("Addition action required to faciliate request");
    case rc >=400 && rc <= 499:
      buildRequestErrorResponse();
      break;
    case rc >= 500 && rc <= 599:
      buildServerErrorResponse();
      break;
    
  }
}

function buildRequestErrorResponse():void {
  throw new Error("Function not implemented.");
}


  
function buildServerErrorResponse():void {
  throw new Error("Function not implemented.");
}

