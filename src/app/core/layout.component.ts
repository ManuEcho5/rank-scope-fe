import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { interval, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  template: `
  <div class="app-shell">
    <mat-toolbar class="toolbar-accent" color="#ffffff">
      <div class="toolbar-inner">
        <span class="brand">Rank<span class="accent">Scope</span></span>
        <span class="spacer"></span>
        <div class="connection-indicator" [matTooltip]="backendStatusTooltip" aria-label="Backend connectivity status" role="status" aria-live="polite">
          <span class="dot" [class.up]="backendUp" [class.down]="!backendUp"></span>
          <span class="status-text" [class.up]="backendUp" [class.down]="!backendUp">{{ backendUp ? 'Connected' : 'Disconnected' }}</span>
        </div>
        <button mat-icon-button aria-label="Toggle theme" (click)="toggleTheme()">
          <mat-icon>{{ dark ? 'light_mode' : 'dark_mode' }}</mat-icon>
        </button>
      </div>
    </mat-toolbar>
    <main class="main-container">
      <ng-content></ng-content>
    </main>
    <footer class="footer-note">© {{year}} RankScope | Developed By Echo5Digital</footer>
  </div>
  `,
  styles: [`
  .toolbar-inner { max-width: var(--content-max,1040px); margin:0 auto; width:100%; padding:0 32px; box-sizing:border-box; display:flex; align-items:center; }
  .brand { font-weight:700; letter-spacing:.5px; font-size:1.05rem; }
    .accent { background: linear-gradient(90deg,#6366f1,#8b5cf6); -webkit-background-clip:text; color:transparent; }
    .spacer { flex:1; }
    .dark-theme .accent { background: linear-gradient(90deg,#a78bfa,#6366f1); }
    .connection-indicator { display:flex; align-items:center; margin-right:4px; }
    .connection-indicator .dot { width:14px; height:14px; border-radius:50%; box-shadow:0 0 0 2px rgba(0,0,0,.08),0 0 0 4px rgba(0,0,0,.02); position:relative; }
    .connection-indicator .dot::after { content:""; position:absolute; inset:0; border-radius:inherit; filter:blur(3px); opacity:.6; }
    .connection-indicator .dot.up { background:radial-gradient(circle at 30% 30%, #6ee7b7, #10b981 65%, #059669); }
    .connection-indicator .dot.up::after { background:radial-gradient(circle,#6ee7b7,#10b981); }
    .connection-indicator .dot.down { background:radial-gradient(circle at 30% 30%, #fca5a5,#ef4444 65%,#b91c1c); }
    .connection-indicator .dot.down::after { background:radial-gradient(circle,#fca5a5,#ef4444); }
  .connection-indicator .status-text { margin-left:6px; font-size:.70rem; font-weight:600; letter-spacing:.5px; text-transform:uppercase; user-select:none; transition:color .25s ease; }
  .connection-indicator .status-text.up { color:#059669; }
  .connection-indicator .status-text.down { color:#dc2626; }
  @media (max-width: 640px) {
    .toolbar-inner { padding:0 14px; }
    mat-toolbar.toolbar-accent { min-height:56px; }
    .brand { font-size:.95rem; }
    .connection-indicator { margin-right:6px; }
    .connection-indicator .status-text { font-size:.6rem; }
    .spacer { flex:1; }
  }
  `]
})
export class LayoutComponent implements OnInit, OnDestroy {
  year = new Date().getFullYear();
  dark = false;
  backendUp = true;
  backendStatusTooltip = 'Checking API...';
  private pollSub?: Subscription;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.checkOnce();
    // Poll every 30s
    this.pollSub = interval(30000).subscribe(()=> this.checkOnce());
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  private checkOnce(){
    this.http.get(environment.apiBase + '/health', { responseType: 'text'}).pipe(
      catchError(()=>{ this.setStatus(false); return [] as any; })
    ).subscribe(()=> this.setStatus(true));
  }

  private setStatus(up:boolean){
    this.backendUp = up;
    this.backendStatusTooltip = up? 'Backend reachable' : 'Backend unreachable';
  }

  toggleTheme() {
    this.dark = !this.dark;
    document.documentElement.classList.toggle('dark-theme', this.dark);
  }
}

