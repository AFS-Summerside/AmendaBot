
import { getReponseCode } from "../responseCodes";
import { ServerError } from "./ServerError";

export class InvalidReponseCode extends ServerError{
    protected responseCode = getReponseCode(500)
    protected responseCodeReason = "The response code attempted was invalid, converting to Internal Server Error 500";
    constructor(rc: number){
        super("Invalid Response of " + rc.toString() + " converting to Server Error 500" );
    }
}