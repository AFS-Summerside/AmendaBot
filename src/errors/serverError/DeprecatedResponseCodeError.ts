import { AmendaError } from "../AmendaError";
import { getReponseCode, response } from "../responseCodes";

export class DeprecatedResponseError extends AmendaError{
    protected responseCode: response;
    protected responseCodeReason: string;
    maxResponseCode: number = 0
    minResponseCode: number = 999
    constructor(msg: string, rc: response){
        super(msg);
        this.responseCode = getReponseCode(500)
        this.responseCodeReason = "Deprecated response of " + rc.code + " converting to server error"
    }
}