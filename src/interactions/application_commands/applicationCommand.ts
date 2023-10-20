import { Logger } from "@aws-lambda-powertools/logger";
import { Trigger } from "../../trigger/Trigger";
import { isExpectedType } from "../../validators/attributeChecker";
import { applicationCommand } from "../../types/applicationCommand";

const logger = new Logger();
type dataType = applicationCommand | undefined;

export function handleApplicationCommand(triggerEvent: Trigger): void {
    let data: dataType | undefined = triggerEvent.getRequestBody().interaction.data;
    try{
        isExpectedType(data, {} as applicationCommand);
        processApplicationCommand(triggerEvent);
    }
    catch(error){
        if (data===undefined){
            logger.error("interaction data was not populated on request",error as Error)
        }else{
            logger.error("data in interactiondoes not conform to applicationData schema", JSON.stringify(data));
        }
        throw error;
    }
}

function processApplicationCommand(triggerEvent: Trigger) {
    throw new Error("Function not implemented.");
}

