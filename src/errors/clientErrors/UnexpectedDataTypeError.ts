import { getReponseCode } from "../responseCodes";
import { ClientError } from "./ClientError";

export class UnexpectedDataTypeError extends ClientError{
    protected responseCode = getReponseCode(422);
    protected responseCodeReason: string;
    
    constructor(msg:string){
        super(msg);
        this.responseCodeReason = msg;
    }
}