import { Handler, APIGatewayProxyEvent } from "aws-lambda";
import { Trigger } from "./trigger/Trigger";
import { interactionType } from "./types/interactionType";
import { handlePing } from "./interactions/ping/ping";
import { handleApplicationCommand } from "./interactions/application_commands/applicationCommand";
import { AmendaError } from "./errors/AmendaError";
import { getReponseCode } from "./errors/responseCodes";
import { UhOh } from "./errors/serverError/UhOh";
import { Logger } from '@aws-lambda-powertools/logger';
import { InvalidRequestTypeError } from "./errors/clientErrors/InvalidRequestTypeError";

const logger = new Logger();

// Lambda Handler - gets invoked by trigger
export const handler: Handler = async function (event: APIGatewayProxyEvent):Promise<{statusCode:string,body:string}> {
  const signature = event.headers["x-signature-ed25519"] ?? "";
  const timestamp = event.headers["x-signature-timestamp"] ?? "";
  const strBody = event.body ?? "";
  let triggerEvent: Trigger = new Trigger(strBody);

  try {
    triggerEvent.verifyCall(signature, timestamp);
    handleRequest(triggerEvent);
    logger.info("Request handled!")
  } catch (error) {
    handleError(error, triggerEvent);
  } finally {
    let respCode:string = triggerEvent.getResponseCode().code.toString();
    let respBody:string = JSON.stringify({message:triggerEvent.getResponseBody()});

    const resp = {
      statusCode: respCode, 
      body: respBody
    }

    logger.info("response -> " + JSON.stringify(resp));
    return resp;
  }
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
    // Uncomment when implemented
    // case interactionType.MESSAGE_COMPONENT: {
    //   handleMessageComponent(triggerEvent);
    //   break;
    // }
    // case interactionType.APPLICATION_COMMAND_AUTOCOMPLETE: {
    //   handleApplicationCommandAutocomplete(triggerEvent);
    //   break;
    // }
    // case interactionType.MODAL_SUBMIT: {
    //   handleModalSubmit(triggerEvent);
    //   break;
    // }
    default: {
      throw new InvalidRequestTypeError("Request type of " + triggerEvent.getRequestBody().interactionType + " is invalid");
    }
  }
}

function handleError(error: unknown, triggerEvent: Trigger) {
  // All system defined errors should extend AmendaError. If something is thrown that does not
  // extends AmendaError, it is a system runtime error, and should result in an HTTP 500 response
  if (error instanceof AmendaError) {
    logger.error("Error processing request", error);
    triggerEvent.setResponseCode(error.getResponse());
    triggerEvent.setResponseBody(error.getResponseCodeReason());
  }
  // The UhOh error type is used when there is was an error attempting to make an AmendaError so these
  else if (error instanceof UhOh) {
    logger.error("Generic System Error", error);
    triggerEvent.setResponseCode(getReponseCode(500));
    triggerEvent.setResponseBody(error.message);
  }
  // just a catchall to log unchecked exceptions
  else {
    logger.critical("wtf is this, and why is it in my catchall", error as Error);
    triggerEvent.setResponseCode(getReponseCode(500));
    triggerEvent.setResponseBody("Something went wrong unexpectedly... it's not you, its me");
  }
}
