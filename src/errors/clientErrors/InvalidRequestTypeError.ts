import { ClientError } from "./ClientError";
import { getReponseCode, response } from "../responseCodes";

export class InvalidRequestTypeError extends ClientError{
    protected responseCode: response;
    protected responseCodeReason: string;

    constructor(reason:string){
        super(reason);
        this.responseCode = getReponseCode(400);
        this.responseCodeReason = reason;
    }
}