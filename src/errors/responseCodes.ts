export enum responseCategory {
    INFORMATIONAL=100,
    SUCCESSFUL=200,
    REDIRECTION=300,
    CLIENT_ERROR=400,
    SERVER_ERROR=500
}

export type response = {
    code:number;
    name:string;
    description:string;
    category:responseCategory;
}

// export const InfomrationalResponseCodes: response[]=[
//     {code:100,name:"Continue",description:"Continue request, or ignore if finished",category:responseCategory.INFORMATIONAL},
//     {code:101,name:"Switching Protocols",description:"Changing protocols based on an update header",category:responseCategory.INFORMATIONAL},
//     {code:102,name:"Processing",description:"Request is still in flight, please wait",category:responseCategory.INFORMATIONAL},
//     {code:103,name:"Early Hints",description:"Allows preloading with Link header",category:responseCategory.INFORMATIONAL}
// ];

// export const SuccessfulResponse = {
//     OK as
//         {
//             code:200;
//             name:"OK";
//             description:"Request completed success";
//             category:responseCategory.SUCCESSFUL;
//         }
// }
//     CREATED:{code:201,name:"Created",description:"Resource created succesfully",category:responseCategory.SUCCESSFUL},
//     response:{code:202,name:"Accepted",description:"Request recieved",category:responseCategory.SUCCESSFUL},
//     reponse:{code:203,name:"Non-Authoritive Information",description:"Data supplied is from a mirror or backup",category:responseCategory.SUCCESSFUL},
//     reponse:{code:204,name:"No Content",description:"No content for this request",category:responseCategory.SUCCESSFUL},
//     {code:205,name:"Reset Content",description:"Reset the sendinf document",category:responseCategory.SUCCESSFUL},
//     {code:206,name:"Partial Content",description:"Used with limit header, a portion of the resource is returned",category:responseCategory.SUCCESSFUL},
//     {code:207,name:"Multi-status",description:"Multiple status codes present",category:responseCategory.SUCCESSFUL},
//     {code:208,name:"Already Reported",description:"?",category:responseCategory.SUCCESSFUL},
//     {code:226,name:"IM Used",description:"Instance Manipulation used on returned resource",category:responseCategory.SUCCESSFUL}

