import { Logger } from "@aws-lambda-powertools/logger";
import { getReponseCode } from "../../errors/responseCodes";
import { Trigger } from "../../trigger/Trigger";
import { interactionType } from "../../types/interactionType";

const responseBody = {
  type: interactionType.PING,
};
const logger = new Logger();

export function handlePing(triggerEvent: Trigger) {
  logger.info("Ping Recieved")
  triggerEvent.setResponseCode(getReponseCode(200));
  triggerEvent.setResponseBody(JSON.stringify(responseBody));
}
