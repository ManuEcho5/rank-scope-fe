import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RankCheckerService, RankResponse } from '../services/rank-checker.service';

@Component({
  selector: 'app-keyword-rank-checker',
  templateUrl: './keyword-rank-checker.component.html',
  styleUrls: ['./keyword-rank-checker.component.css']
})
export class KeywordRankCheckerComponent {
  form: FormGroup;
  loading = false;
  result: RankResponse | null = null;
  error: string | null = null;
  countries = [
    { code: 'us', name: 'United States' },
    { code: 'gb', name: 'United Kingdom' },
    { code: 'ca', name: 'Canada' },
    { code: 'au', name: 'Australia' },
    { code: 'in', name: 'India' },
    { code: 'de', name: 'Germany' },
    { code: 'fr', name: 'France' },
    { code: 'es', name: 'Spain' },
    { code: 'it', name: 'Italy' },
    { code: 'br', name: 'Brazil' }
  ];

  constructor(private fb: FormBuilder, private rankService: RankCheckerService) {
    this.form = this.fb.group({
      keyword: ['', [Validators.required]],
      domain: ['', [Validators.required]],
      country: ['us'],
      location: ['']
    });
  }

  submit() {
    if (this.form.invalid) return;
  const { keyword, domain, country, location } = this.form.value;
    this.loading = true;
    this.result = null;
    this.error = null;
  this.rankService.checkRank(keyword, domain, { country, location }).subscribe({
      next: (res: RankResponse) => {
        this.result = res;
        this.loading = false;
      },
      error: (err: unknown) => {
        if (err && typeof err === 'object' && 'message' in err) {
          this.error = (err as any).message as string;
        } else {
          this.error = 'Request failed';
        }
        this.loading = false;
      }
    });
  }
}
