import { ClientError } from "./ClientError";
import { getReponseCode } from "../responseCodes";

export class InvalidRequestTypeError extends ClientError{
    protected responseCode = getReponseCode(400);
    protected responseCodeReason: string;

    constructor(reason:string){
        super(reason);
        this.responseCodeReason = reason;
    }
}