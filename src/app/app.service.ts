import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  /** URL to the backend API */
  private readonly API_URL = `https://countdown.mohitbhagat.in/api/deadline`;

  /** Inject HttpClient for making HTTP requests */
  private readonly http: HttpClient = inject(HttpClient);

  /** Fetch secondsLeft from backend */
  getSecondsLeft(): Observable<number> {
    return this.http.get<{ secondsLeft: number }>(this.API_URL).pipe(
      // Extract the secondsLeft property from the response object
      map((response) => response.secondsLeft)
    );
  }
}
