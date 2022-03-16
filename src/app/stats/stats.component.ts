import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../service/document.service";
import {MatTableDataSource} from "@angular/material/table";
import {Document} from "../../models/Document";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  loading:boolean = true;
  trieParDate:boolean = true;
  trieParType:boolean = true;

  dataSource = new MatTableDataSource<Document>();

  columnTable: string[] = ['date', 'type', 'nombre'];

  constructor(private readonly documentService:DocumentService) {
    this.loading = true;
    this.documentService.stats().subscribe(list => {
      this.dataSource.data = list as [];
      this.loading = false;
    });
  }

  changeTrie(){
    this.loading = true;
    if (this.trieParDate && this.trieParType){
      this.documentService.stats().subscribe(list => {
        this.columnTable = ['date', 'type', 'nombre'];
        this.dataSource.data = list as [];
        this.loading = false;
      });
    }
    else if (this.trieParDate){
      this.documentService.statsByDate().subscribe(list => {
        this.columnTable = ['date', 'nombre'];
        this.dataSource.data = list as [];
        this.loading = false;
      });
    }
    else if (this.trieParType){
      this.documentService.statsByType().subscribe(list => {
        this.columnTable = ['type', 'nombre'];
        this.dataSource.data = list as [];
        this.loading = false;
      });
    }
  }

  ngOnInit(): void {

  }

}
