import { Creator } from "./Creator";

export interface Comic{
     id : string,
     title : string,
     description : string,
     image : string,
     printPrice : number,
     publishDate : string,
     creators : Creator[]
}