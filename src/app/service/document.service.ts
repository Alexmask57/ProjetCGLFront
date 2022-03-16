import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url = "http://localhost:8080/doc"; //url vers l'api

  constructor(private readonly http: HttpClient) { }

  /**
   * Récupère la liste de tout les documents
   */
  fetch(): Observable<Document[]> {
    return this.http.get<Document[]>(this.url);
  }

  /**
   * Récupère un document
   * @param id id du document à récupérer
   */
  fetchOne(id: string): Observable<Document> {
    return this.http.get<Document>(this.url + '/' + id);
  }

  create(nom: string, path: string): Observable<Document> {
    return this.http.post<Document>(this.url, {"nom": nom, "path": path});
  }

  delete(id: string): any {
    return this.http.delete<Document>(this.url + "/" + id);
  }
}
