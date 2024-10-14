import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataRecordStore } from './store/csv-data-loading/data-record-store';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { mainMenu } from './app.routes';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
  ],
  providers: [DataRecordStore],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly store = inject(DataRecordStore);
  menuVisible = true;

  readonly mainMenu = Object.values(mainMenu).map(({ path, label }) => {
    return {
      path: `/${path}`,
      label,
    };
  });
  screenWidth: number = window.innerWidth;
  ngOnInit(): void {
    this.store.initializeBatteries();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const screenWidth = (event.target as Window).innerWidth;
    if (screenWidth >= 1200) {
      this.menuVisible = true;
    } else {
      this.menuVisible = false;
    }
  }
}
