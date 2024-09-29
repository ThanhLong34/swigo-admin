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
import { MenuItem, PrimeTemplate, SortEvent } from 'primeng/api';
import { ContextMenu } from 'primeng/contextmenu';
import { PaginatorState } from 'primeng/paginator';
import { Table, TableService } from 'primeng/table';
import { Nullable } from 'primeng/ts-helpers';
import { SharedModule } from 'src/app/demo/shared/shared.module';

type SelectionMode = 'single' | 'multiple';

interface PageInfo {
  pageSize: number;
  pageNumber: number;
  totalItems: number;
  totalPages: number;
  sort: string | null | undefined;
}

const pageInfoInitial: PageInfo = {
  pageSize: 10,
  pageNumber: 1,
  totalItems: 0,
  totalPages: 0,
  sort: undefined
};

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
  selectedData: any[] = [];
  ctxMenuSelectedItem: any | null = null;
  contextMenuActions = ['view', 'edit', 'delete'];
  ctxMenuItems: MenuItem[] = [];
  paginatorState: PaginatorState = {
    first: 0,
    rows: 10
  };
  isSorted: boolean | null = null;

  // Inputs
  @Input() data: any[] = [];
  @Input() createButtonText = 'New';
  @Input() batchDeleteButtonText = 'Batch delete';
  @Input() reloadButtonText = 'Reload';
  @Input() selectionMode: SelectionMode = 'single';
  @Input() dataKey = 'id';
  @Input() itemPerPageOptions = [10, 20, 50, 100];
  @Input() pageInfo: PageInfo = { ...pageInfoInitial };

  // Outputs
  @Output() createData = new EventEmitter();
  @Output() batchDeleteData = new EventEmitter<{
    event: MouseEvent;
    selectedData: any[];
  }>();
  @Output() reloadData = new EventEmitter();
  @Output() changePage = new EventEmitter<{
    pageNumber: number;
    pageSize: number;
  }>();
  @Output() sort = new EventEmitter<string>();
  @Output() pageInfoChange = new EventEmitter<PageInfo>();

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
    });
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
  deleteSelectedDataFunc(e: MouseEvent) {
    this.batchDeleteData.emit({
      event: e,
      selectedData: this.selectedData
    });
  }
  reloadDataFunc() {
    this.primeTable.reset();
    this.pageInfo = { ...pageInfoInitial };
    this.pageInfoChange.emit(this.pageInfo);
    this.paginatorState.first = 0;
    this.paginatorState.rows = 10;
    this.reloadData.emit();
  }

  // Context menu functions
  viewDataFunc(data: any) {}
  editDataFunc(data: any) {}
  deleteDataFunc(data: any) {}
  showContextMenu(e: MouseEvent, data: any) {
    this.ctxMenuSelectedItem = data;
    this.ctxMenu.show(e);
  }

  // Pagination functions
  changePageFunc(e: PaginatorState) {
    this.paginatorState.first = e.first ?? 0;
    this.paginatorState.rows = e.rows ?? 0;
    this.changePage.emit({
      pageNumber: e.page ? e.page + 1 : 1,
      pageSize: e.rows ?? 0
    });
  }

  // Table functions
  sortData(e: SortEvent) {
    const sortFields = e.multiSortMeta?.map((sortMeta) => ({
      field: sortMeta.field,
      order: sortMeta.order === 1 ? 'asc' : 'desc'
    }));
    const sortQuery = sortFields?.map((sortField) => `${sortField.field}:${sortField.order}`).join(',');
    this.sort.emit(sortQuery ?? '');
  }
  customSort(e: SortEvent) {
    if (!this.isSorted) {
      this.isSorted = true;
      this.sortData(e);
    } else {
      this.isSorted = false;
      this.sortData(e);
    }
  }
  clearSelectedData() {
    this.selectedData = [];
  }
}
