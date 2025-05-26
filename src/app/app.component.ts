import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AppService } from './app.service';
import { CountdownComponent } from './countdown/countdown.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
  imports: [CommonModule, CountdownComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [AppService],
})
export class AppComponent implements OnDestroy {
  // Observable holding the number of seconds left, as received from the API
  apiSecondsLeft$ = new BehaviorSubject<number>(0);

  // Flag indicating if the data is currently being fetched
  fetching = true;

  // Holds the subscription to the API observable
  private subscriptions?: Subscription;
  // Flag indicating if there was an error fetching the data
  error: boolean = false;

  // Injects ChangeDetectorRef for manual change detection and AppService for API calls
  constructor(private cdr: ChangeDetectorRef, private appService: AppService) {}

  // Lifecycle hook: called after component initialization
  ngOnInit() {
    this.fetchSecondsLeft();
  }

  // Fetches the seconds left from the API and updates the observable
  private fetchSecondsLeft() {
    // Unsubscribe from any previous subscription to avoid memory leaks
    this.subscriptions?.unsubscribe();
    // Subscribe to the API observable to get the seconds left
    this.appService.getSecondsLeft().subscribe({
      next: (secondsLeft) => {
        this.fetching = false; // Data fetching complete
        this.apiSecondsLeft$.next(secondsLeft); // Update the observable with new value
        this.error = false; // Reset error flag
        this.cdr.markForCheck(); // Trigger change detection for OnPush strategy
      },
      error: (error) => {
        console.error('Error fetching seconds left:', error); // Log any errors
        this.fetching = false; // Stop fetching indicator
        this.error = true; // Set error flag to true
        this.cdr.markForCheck(); // Trigger change detection for OnPush strategy
      },
    });
  }

  // Lifecycle hook: called when the component is destroyed
  ngOnDestroy() {
    // Clean up the subscription to prevent memory leaks
    this.subscriptions?.unsubscribe();
  }
}
