import { interactionType } from "../type"
import { commandName } from "./commandName"
import { options } from "./options"

export type command = {
    name: commandName,
    type: interactionType,
    description: string,
    options: options[] 
}