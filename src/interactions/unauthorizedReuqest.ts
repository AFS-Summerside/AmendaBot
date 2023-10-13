import { Trigger } from "../Trigger";
import { clientError } from '../errors/authorizationError';

export function handleUnauthorizedRequest(triggerEvent: Trigger): void {
    const error: authorizationError = {
        responseCodeReason: 
    }
    console.error("Unauthorized request attempted >>" + triggerEvent.getRequestBody() + "<<");
    triggerEvent.setResponseCode(401);
    triggerEvent.setResponseBody("Request is not authrorized");
}
