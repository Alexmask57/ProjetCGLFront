import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Type} from "../../models/Type";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private url = "http://localhost:4200/api/type"; //url vers l'api

  constructor(private readonly http: HttpClient) { }

  fetch(): Observable<Type[]> {
    return this.http.get<Type[]>(this.url);
  }

}
