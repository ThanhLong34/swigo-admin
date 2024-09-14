// angular import
import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // public props
  isSpinnerVisible = true;

  // constructor
  constructor(
    private router: Router,
    private _title: Title,
    @Inject(I18NEXT_SERVICE) private i18NextService: ITranslationService
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isSpinnerVisible = false;
        }
      },
      () => {
        this.isSpinnerVisible = false;
      }
    );
  }

  ngOnInit() {
    this.i18NextService.events.languageChanged.subscribe(() => {
      const root = this.router.routerState.root;
      if (root != null && root.firstChild != null) {
        const data = root.firstChild.data;
        data
          .pipe(
            tap((data) => {

            })
          )
          .subscribe();
      }
    });
  }
}
