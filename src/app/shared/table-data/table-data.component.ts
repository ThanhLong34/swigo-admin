import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { MenuItem, PrimeTemplate } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { Table, TableService } from 'primeng/table';
import { Nullable } from 'primeng/ts-helpers';
import { SharedModule } from 'src/app/demo/shared/shared.module';

type SelectionMode = 'single' | 'multiple';
export interface TableProps {
  createBtnText: string;
  batchDeleteBtnText: string;
  reloadBtnText: string;
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
export class TableDataComponent implements OnInit, AfterContentInit {
  // Properties
  selectedData: any[] | null = null;
  ctxMenuSelectedItem: any | null = null;
  contextMenuActions = ['view', 'edit', 'delete'];
  ctxMenuItems: MenuItem[] = [];

  // Inputs
  @Input() data: any[] = [];
  @Input() tableProps: TableProps = {
    createBtnText: 'New',
    batchDeleteBtnText: 'Batch delete',
    reloadBtnText: 'Reload',
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

  // ViewChild
  @ViewChild('primeTable', { static: true }) primeTable!: Table;
  @ViewChild('ctxMenu', { static: true }) ctxMenu!: ContextMenu;

  //! Constructor
  constructor() {}

  ngOnInit(): void {
    this.contextMenuActions.forEach((ctxItem) => {
      switch (ctxItem) {
        case 'view':
          this.ctxMenuItems.push({
            label: 'View',
            icon: 'pi pi-eye',
            command: () => this.viewDataFunc(this.ctxMenuSelectedItem)
          });
          break;
        case 'edit':
          this.ctxMenuItems.push({
            label: 'Edit',
            icon: 'pi pi-pen-to-square',
            command: () => this.editDataFunc(this.ctxMenuSelectedItem)
          });
          break;
        case 'delete':
          this.ctxMenuItems.push({
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => this.deleteDataFunc(this.ctxMenuSelectedItem)
          });
          break;
      }
    })
  }

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

  // Top bar button functions
  createDataFunc() {
    this.createData.emit();
  }
  deleteSelectedDataFunc() {
    this.batchDeleteData.emit();
  }
  reloadDataFunc() {

  }

  // Context menu functions
  viewDataFunc(data: any) {

  }
  editDataFunc(data: any) {

  }
  deleteDataFunc(data: any) {

  }
  showContextMenu(event: MouseEvent, data: any) {
    this.ctxMenuSelectedItem = data;
    this.ctxMenu.show(event);
  }

}
