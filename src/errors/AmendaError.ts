import { UhOh } from "./UhOh";

export abstract class AmendaError {
    abstract responseCode: number;
    abstract reponseCodeDescription: string;
    abstract responseCodeReason: string;
    abstract responseCodeSetBy: string;
    abstract minResponseCode: number;
    abstract maxResponseCode: number;

    protected validateResponseCode(aResponseCode: number): number {
        if (aResponseCode >= this.minResponseCode && aResponseCode <= this.maxResponseCode) {
            return aResponseCode;
        }
        throw new UhOh("ReponseCode of " + aResponseCode + " was invalid");
    }

    public getResponseCode(): number {
        return this.responseCode;
    }
    public getResponseDescription(): string {
        return this.reponseCodeDescription;
    }
    public getResponseCodeReason(): string {
        return this.responseCodeReason;
    };
    public getResponseCodeSetBy(): string {
        return this.responseCodeSetBy;
    };
}

