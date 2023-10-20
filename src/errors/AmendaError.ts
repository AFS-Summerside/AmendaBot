import { UhOh } from "./serverError/UhOh";
import { response } from "./responseCodes";

export abstract class AmendaError extends Error{
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
    throw new UhOh("ReponseCode of " + aResponseCode + " was invalid");
  }

  public getResponse(): response {
    return this.responseCode;
  }
  public getResponseDescription(): string {
    return this.responseCode.description;
  }
  public getResponseCodeReason(): string {
    return this.responseCodeReason;
  }

}
