import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { Table, TableService } from 'primeng/table';
import { Nullable } from 'primeng/ts-helpers';
import { SharedModule } from 'src/app/demo/shared/shared.module';

type SelectionMode = 'single' | 'multiple';
export interface TableProps {
  createBtnText: string;
  batchDeleteBtnText: string;
  selectionMode: SelectionMode;
  dataKey: string;
}

export function tableFactory(comp: TableDataComponent) {
  return comp.primeTable;
}

@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.scss',
  providers: [
    TableService,
    {
      provide: Table,
      useFactory: tableFactory,
      deps: [TableDataComponent]
    }
  ]
})
export class TableDataComponent implements AfterContentInit {
  // Properties
  selectedData: any[] | null = null;

  // Inputs
  @Input() data: any[] = [];
  @Input() tableProps: TableProps = {
    createBtnText: 'New',
    batchDeleteBtnText: 'Batch delete',
    selectionMode: 'single',
    dataKey: 'id'
  };

  // Outputs
  @Output() createData = new EventEmitter();
  @Output() batchDeleteData = new EventEmitter();

  // Templates
  headerTemplate: Nullable<TemplateRef<any>>;
  bodyTemplate: Nullable<TemplateRef<any>>;
  @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

  // make sure the id is in your markup <p-table #primeTable>
  @ViewChild('primeTable', { static: true }) primeTable!: Table;

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
