import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DocumentService} from "../service/document.service";
import {Document} from "../../models/Document";

@Component({
  selector: 'consulter-document',
  templateUrl: './consulter-document.component.html',
  styleUrls: ['./consulter-document.component.scss']
})
export class ConsulterDocumentComponent implements OnInit {

  loading:boolean = true;

  listDocuments: Document[] = [];

  dataSource = new MatTableDataSource<Document>();

  columnTable: string[] = ['id', 'nom', 'date', 'path', 'type', 'delete'];

  constructor(private readonly documentService:DocumentService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.documentService.fetch().subscribe(list => {
      this.listDocuments = list || [];
      this.dataSource.data = list;
      this.loading = false;
    });
  }

  delete(id: string): void {
    this.documentService.delete(id).subscribe(() => {
      this.documentService.fetch().subscribe(list => {
        this.listDocuments = list || [];
        this.dataSource.data = this.listDocuments;
      });
    });
  }

}
