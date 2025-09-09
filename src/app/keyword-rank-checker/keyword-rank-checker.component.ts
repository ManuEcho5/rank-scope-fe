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

  constructor(private fb: FormBuilder, private rankService: RankCheckerService) {
    this.form = this.fb.group({
      keyword: ['', [Validators.required]],
      domain: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { keyword, domain } = this.form.value;
    this.loading = true;
    this.result = null;
    this.error = null;
    this.rankService.checkRank(keyword, domain).subscribe({
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
