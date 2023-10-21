import { UhOh } from "./serverError/UhOh";
import { response } from "./responseCodes";
import { AmendaErrorInterface } from "./AmendaErrorInterface"

export abstract class AmendaError extends Error implements AmendaErrorInterface{
  protected abstract responseCode: response;
  protected abstract responseCodeReason: string;
  abstract minResponseCode: number;
  abstract maxResponseCode: number;

  constructor(reason: string) {
    super(reason);
  }

  protected validateResponseCode(aResponseCode: number): number {
    if (aResponseCode >= this.minResponseCode && aResponseCode <= this.maxResponseCode) {
      return aResponseCode;
    }
    throw new UhOh("Return code for this type must be between " + this.minResponseCode + " and " + this.maxResponseCode + " [" + this.responseCode + "] is not valid",500);
  }

  public getResponse(): response {
    return this.responseCode;
  }
  public getResponseCode(): number{
    return this.responseCode.code;
  }
  public getResponseDescription(): string {
    return this.responseCode.description;
  }
  public getResponseCodeReason(): string {
    return this.responseCodeReason;
  }
}
