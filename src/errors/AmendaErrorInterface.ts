export interface AmendaErrorInterface{
    getResponseCode(): number;
    getResponseDescription(): string;
    getResponseCodeReason(): string;
}