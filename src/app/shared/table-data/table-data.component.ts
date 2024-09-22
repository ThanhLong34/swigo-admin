import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList, TemplateRef } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { Nullable } from 'primeng/ts-helpers';
import { SharedModule } from 'src/app/demo/shared/shared.module';

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.scss'
})
export class TableDataComponent implements AfterContentInit {
  // Properties
  selectedData: any[] | null = null;

  // Inputs
  @Input() data: any[] = [];
  @Input() createDialogProps = {
    title: 'Create Dialog',
    visible: false,
    cancelBtnText: 'Cancel',
    submitBtnText: 'Submit'
  }
  @Input() tableProps = {
    createBtnText: 'New',
    batchDeleteBtnText: 'Batch delete',
  }

  // Outputs
  @Output() createData = new EventEmitter();
  @Output() batchDeleteData = new EventEmitter();

  // Templates
  headerTemplate: Nullable<TemplateRef<any>>;
  bodyTemplate: Nullable<TemplateRef<any>>;
  @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

  //! Constructor
  constructor() {}

  ngAfterContentInit() {
    (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;
        case 'body':
          this.bodyTemplate = item.template;
          break;
      }
    });
  }

  deleteSelectedDataFunc() {
    this.batchDeleteData.emit();
  }

  createDataFunc() {
    this.createData.emit();
  }
}
