import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { I18NextNamespacePipe } from 'src/app/pipes/i18next-namespace.pipe';
import { I18NextModule } from 'angular-i18next';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [SharedModule, I18NextNamespacePipe, I18NextModule],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  handleRedirectToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
