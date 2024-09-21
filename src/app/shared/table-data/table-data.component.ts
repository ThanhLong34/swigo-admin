import { CommonModule } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
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
  @Input() data: any[] = [];
  @Input() selectedData: any[] | null = null;
  headerTemplate: Nullable<TemplateRef<any>>;
  bodyTemplate: Nullable<TemplateRef<any>>;
  @ContentChildren(PrimeTemplate) templates: Nullable<QueryList<PrimeTemplate>>;

  constructor() {}

  ngAfterContentInit() {
    (this.templates as QueryList<PrimeTemplate>).forEach((item) => {
      console.log(item.getType());
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

  openCreateDialog() {}

  deleteSelectedData() {}
}
