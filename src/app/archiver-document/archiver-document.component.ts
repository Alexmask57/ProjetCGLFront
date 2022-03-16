import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Type} from "../../models/Type";
import {DocumentService} from "../service/document.service";
import {TypeService} from "../service/type.service";
import {Document} from "../../models/Document";

@Component({
  selector: 'archiver-document',
  templateUrl: './archiver-document.component.html',
  styleUrls: ['./archiver-document.component.scss']
})
export class ArchiverDocumentComponent implements OnInit {

  form: FormGroup;
  documentModel: Document | any;
  types: Type[] = [];
  @ViewChild("fileInput") fileInput!: ElementRef;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(private readonly documentService:DocumentService, private readonly typeService:TypeService) {
    this.typeService.fetch().subscribe(list => {
      this.types = list || [];
    });
    this.form = ArchiverDocumentComponent.buildForm();
    this.documentModel = {};
  }

  ngOnInit(): void {
  }

  onFileSelected(event:Event | null) {
    const files = (<HTMLInputElement>event?.currentTarget).files;
    const file:File | null = files!.item(0);

    if (file) {
      this.documentModel.path = file.name;
    }
  }

  submit(document: any) {
    if(this.documentModel.path != undefined){
      document.path = this.documentModel.path;
      this.documentService.create(document?.nom as string, document?.path as string, document?.type as string).subscribe(res => {
        location.reload();
      });
    }
  }

  private static buildForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      nom: new FormControl(''),
      type: new FormControl('')
    });
  }

}
