import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DocumentService} from "../service/document.service";
import {Document} from "../../models/Document";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'consulter-document',
  templateUrl: './consulter-document.component.html',
  styleUrls: ['./consulter-document.component.scss']
})
export class ConsulterDocumentComponent implements AfterViewInit {

  loading:boolean = true;

  listDocuments: Document[] = [];

  dataSource = new MatTableDataSource<Document>();

  columnTable: string[] = ['id', 'nom', 'date', 'path', 'type', 'delete'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private readonly documentService:DocumentService) {
    this.loading = true;
  }

  ngAfterViewInit() {
    this.documentService.fetch().subscribe(list => {
      this.listDocuments = list || [];
      this.dataSource.data = list;
      this.dataSource.paginator = this.paginator;
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
