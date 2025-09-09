import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  template: `
  <div class="app-shell">
    <mat-toolbar class="toolbar-accent" color="primary">
      <span class="brand">Rank<span class="accent">Scope</span></span>
      <span class="spacer"></span>
      <button mat-icon-button aria-label="Toggle theme" (click)="toggleTheme()">
        <mat-icon>{{ dark ? 'light_mode' : 'dark_mode' }}</mat-icon>
      </button>
    </mat-toolbar>
    <main class="main-container">
      <ng-content></ng-content>
    </main>
    <footer class="footer-note">© {{year}} RankScope | Developed By Echo5Digital</footer>
  </div>
  `,
  styles: [`
    .brand { font-weight:700; letter-spacing:.5px; font-size:1.05rem; }
    .accent { background: linear-gradient(90deg,#6366f1,#8b5cf6); -webkit-background-clip:text; color:transparent; }
    .spacer { flex:1; }
    .dark-theme .accent { background: linear-gradient(90deg,#a78bfa,#6366f1); }
  `]
})
export class LayoutComponent {
  year = new Date().getFullYear();
  dark = false;
  toggleTheme() {
    this.dark = !this.dark;
    document.documentElement.classList.toggle('dark-theme', this.dark);
  }
}

