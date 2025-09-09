import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { KeywordRankCheckerComponent } from './keyword-rank-checker/keyword-rank-checker.component';
import { LayoutComponent } from './core/layout.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, KeywordRankCheckerComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  MatInputModule,
  MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatIconModule,
  MatSnackBarModule,
  MatChipsModule,
  MatTooltipModule,
  MatDividerModule,
  MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
