import { Logger } from "@aws-lambda-powertools/logger";
import { DeprecatedResponseError } from "./serverError/DeprecatedResponseCodeError";
import { InvalidReponseCode } from "./serverError/InvalidReponseCode";

const logger = new Logger();
export enum responseCategory {
    INFORMATIONAL=100,
    SUCCESSFUL=200,
    REDIRECTION=300,
    CLIENT_ERROR=400,
    SERVER_ERROR=500,
    DEPRECATED=0
}

export type response = {
    code:number;
    name:string;
    description:string;
    category:responseCategory;
}

export function getReponseCode(rc: number):response {
    SuccessfulResponse.forEach(element => {
        if (element.code === rc){
            return element
        }
    });

    ClientErrorResponse.forEach(element => {
        if (element.code === rc){
            return element
        }
    });

    ServerErrorResponse.forEach(element => {
        if (element.code === rc){
            return element
        }
    });

    InfomrationalResponseCodes.forEach(element => {
        if (element.code === rc){
            return element
        }
    });

    RedirectionResponse.forEach(element => {
        if (element.code === rc){
            return element
        }
    });
    DeprecatedResponse.forEach(element => {
        if (element.code === rc){
            logger.critical("Response is deprecated: " + rc)
            throw new DeprecatedResponseError(rc)
        }
    });
    logger.critical("Response Code Not Found: " + rc)
    throw new InvalidReponseCode(rc);
}
const InfomrationalResponseCodes: response[] =[
    <response>{code:100,name:"Continue",description:"Continue request, or ignore if finished",category:responseCategory.INFORMATIONAL},
    <response>{code:101,name:"Switching Protocols",description:"Changing protocols based on an update header",category:responseCategory.INFORMATIONAL},
    <response>{code:102,name:"Processing",description:"Request is still in flight, please wait",category:responseCategory.INFORMATIONAL},
    <response>{code:103,name:"Early Hints",description:"Allows preloading with Link header",category:responseCategory.INFORMATIONAL}
];

const SuccessfulResponse: response[] = [
    <response>{code:200,name:"OK", description:"Request completed success", category:responseCategory.SUCCESSFUL},
    <response>{code:201,name:"Created",description:"Resource created succesfully",category:responseCategory.SUCCESSFUL},
    <response>{code:202,name:"Accepted",description:"Request recieved",category:responseCategory.SUCCESSFUL},
    <response>{code:203,name:"Non-Authoritive Information",description:"Data supplied is from a mirror or backup",category:responseCategory.SUCCESSFUL},
    <response>{code:204,name:"No Content",description:"No content for this request",category:responseCategory.SUCCESSFUL},
    <response>{code:205,name:"Reset Content",description:"Reset the sendinf document",category:responseCategory.SUCCESSFUL},
    <response>{code:206,name:"Partial Content",description:"Used with limit header, a portion of the resource is returned",category:responseCategory.SUCCESSFUL},
    <response>{code:207,name:"Multi-status",description:"Multiple status codes present",category:responseCategory.SUCCESSFUL},
    <response>{code:208,name:"Already Reported",description:"To avoid repeatedly enumerating the internal members of multiple bindings to the same collection?",category:responseCategory.SUCCESSFUL},
    <response>{code:226,name:"IM Used",description:"Instance Manipulation used on returned resource",category:responseCategory.SUCCESSFUL}
]

const RedirectionResponse:response[] = [
    <response>{code:300,name:"Multiple Choices", description:"There are multiple possible reponses, refine criteria", category:responseCategory.REDIRECTION},
    <response>{code:301,name:"Moved Permanently",description:"This URL has been moved",category:responseCategory.REDIRECTION},
    <response>{code:302,name:"Found",description:"Request URI of this resource has changed",category:responseCategory.REDIRECTION},
    <response>{code:303,name:"See Other",description:"Get resource from another location",category:responseCategory.REDIRECTION},
    <response>{code:304,name:"Not Modified",description:"The response has not been modified",category:responseCategory.REDIRECTION},
    <response>{code:307,name:"Temporary Redirect",description:"get the requested resource at another URI with the same method that was used in the prior request",category:responseCategory.REDIRECTION},
    <response>{code:308,name:"Permanent Redirect",description:"This means that the resource is now permanently located at another URI, specified by the Location: HTTP Response header.",category:responseCategory.REDIRECTION},    
]

const ClientErrorResponse:response[] = [
    <response>{code:400,name:"Bad Request", description:"", category:responseCategory.CLIENT_ERROR},
    <response>{code:401,name:"Unauthorized",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:402,name:"Payment Required",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:403,name:"Forbidden",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:404,name:"Not Found",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:405,name:"Method Not Allowed",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:406,name:"Not Acceptable",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:407,name:"Proxy Authentication Required", description:"", category:responseCategory.CLIENT_ERROR},
    <response>{code:408,name:"Request Timeout",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:409,name:"Conflict",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:410,name:"Gone",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:411,name:"Length Required",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:412,name:"Procondition Failed",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:413,name:"Payload Too Large",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:414,name:"URI Too Long",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:415,name:"Unsupported Media Type",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:416,name:"Range Not Satisfiable",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:417,name:"Expectation Failed",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:418,name:"I'm a Teapot",description:"The server refuses the attempt to brew coffee with a teapot.",category:responseCategory.CLIENT_ERROR},
    <response>{code:421,name:"Misdirected Request",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:422,name:"Unprocessable Content",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:423,name:"Locked",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:424,name:"Failed Dependency",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:425,name:"Too Early",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:426,name:"Upgrade Required",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:428,name:"Precondition Required",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:429,name:"Too Many Requests",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:431,name:"Request Header Field Too Large",description:"",category:responseCategory.CLIENT_ERROR},
    <response>{code:451,name:"Unavailable For Legal Reasons",description:"",category:responseCategory.CLIENT_ERROR},
]

export const ServerErrorResponse:response[] = [
    <response>{code:500,name:"Internal Server Error", description:"", category:responseCategory.SERVER_ERROR},
    <response>{code:501,name:"Not Implemented",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:502,name:"Bad Gateway",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:503,name:"Service Unavailable",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:504,name:"Gateway Timeout",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:505,name:"HTTP Version Not Supported",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:506,name:"Variant Also Negotiates",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:507,name:"Insuffient Storage", description:"", category:responseCategory.SERVER_ERROR},
    <response>{code:508,name:"Loops Detected",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:510,name:"Not Extended",description:"",category:responseCategory.SERVER_ERROR},
    <response>{code:511,name:"Network Authentication Error",description:"",category:responseCategory.SERVER_ERROR},
]

export const DeprecatedResponse:response[] = [
    <response>{code:305,name:"Use Proxy",description:"requested response must be accessed by a proxy.",category:responseCategory.DEPRECATED},
    <response>{code:306,name:"Unused",description:"",category:responseCategory.DEPRECATED},
]