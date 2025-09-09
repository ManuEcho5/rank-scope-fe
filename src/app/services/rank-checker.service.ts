import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RankResponse {
  keyword: string;
  domain: string;
  page: number | null;
  position: number | null;
  absoluteRank?: number | null;
  source?: string;
  stable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class RankCheckerService {
  private baseUrl = environment.apiBase;
  constructor(private http: HttpClient) {}

  checkRank(keyword: string, domain: string): Observable<RankResponse> {
    const params = new URLSearchParams({ keyword, domain });
    return this.http.get<RankResponse>(`${this.baseUrl}/check-rank?${params.toString()}`);
  }
}
