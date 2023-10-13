import { UhOh } from "./UhOh";
import { response } from "./responseCodes";

export abstract class AmendaError {
    abstract responseCode: response;
    abstract responseCodeReason: string;
    abstract responseCodeSetBy: string;
    abstract minResponseCode: number;
    abstract maxResponseCode: number;


    constructor({ rc, setBy, reason }: { rc: response; setBy: string; reason: string; }){

    }

    protected validateResponseCode(aResponseCode: number): number {
        if (aResponseCode >= this.minResponseCode && aResponseCode <= this.maxResponseCode) {
            return aResponseCode;
        }
        throw new UhOh("ReponseCode of " + aResponseCode + " was invalid");
    }

    public getResponseCode(): number {
        return this.responseCode.code;
    }
    public getResponseDescription(): string {
        return this.responseCode.description;
    }
    public getResponseCodeReason(): string {
        return this.responseCodeReason;
    };
    public getResponseCodeSetBy(): string {
        return this.responseCodeSetBy;
    };
}

