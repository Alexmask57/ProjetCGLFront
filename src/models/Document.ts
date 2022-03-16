import {Type} from "./Type";

export interface Document {
  id: string;
  nom: string;
  path: string;
  date: Date;
  type: Type;
}
