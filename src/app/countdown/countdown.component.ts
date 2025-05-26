import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-countdown',
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrl: './countdown.component.sass',
})
export class CountdownComponent implements OnDestroy {
  // Input property to set the initial countdown seconds
  @Input() initialSeconds: number = 0;
  // Tracks the remaining seconds in the countdown
  remainingSeconds: number = 0;

  // Inject Angular's NgZone for running code outside Angular's change detection
  ngZone = inject(NgZone);

  // Time breakdown for display
  secondsLeft = 0;
  daysLeft = 0;
  hoursLeft = 0;
  minutesLeft = 0;

  // Holds the subscription to the timer observable
  private subscriptions?: Subscription;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Starts the countdown timer with the given number of seconds.
   * Runs the timer outside Angular's zone for performance.
   */
  private startTimer(seconds: number) {
    this.ngZone.runOutsideAngular(() => {
      this.remainingSeconds = seconds;
      // Unsubscribe from any previous timer
      this.subscriptions?.unsubscribe();
      // Create a new timer observable that emits every second
      this.subscriptions = timer(0, 1000).subscribe(() => {
        if (this.remainingSeconds > 0) {
          // Calculate days, hours, minutes, and seconds left
          this.daysLeft = Math.floor(this.remainingSeconds / 86400);
          this.hoursLeft = Math.floor((this.remainingSeconds % 86400) / 3600);
          this.minutesLeft = Math.floor((this.remainingSeconds % 3600) / 60);
          this.secondsLeft = this.remainingSeconds % 60;
          this.remainingSeconds--;
          // Mark for check to update the view
          this.cdr.markForCheck();
        } else {
          // Stop the timer when countdown reaches zero
          this.subscriptions?.unsubscribe();
        }
      });
    });
  }

  /**
   * Angular lifecycle hook called when input properties change.
   * Starts the timer based on the input value.
   */
  ngOnChanges() {
    console.log('ngOnChanges called with apiSecondsLeft:', this.initialSeconds);
    if (this.initialSeconds > 0) {
      this.startTimer(this.initialSeconds);
    } else {
      this.subscriptions?.unsubscribe();
    }
  }

  /**
   * Angular lifecycle hook called when the component is destroyed.
   * Cleans up the timer subscription.
   */
  ngOnDestroy() {
    this.subscriptions?.unsubscribe();
  }
}
