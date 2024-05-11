import { ItemParams } from "./item-params";

export type UpdateItemParams = { [K in keyof ItemParams]?: K extends "image" ? Buffer | string : ItemParams[K] };
