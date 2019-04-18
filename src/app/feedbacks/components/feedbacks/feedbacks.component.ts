import { Component } from '@angular/core';
import { FeedbacksService } from '../../services/feedbacks.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent {
  feedback = '';

  constructor(public feedbacksService: FeedbacksService) {
    console.log('Feedback component construstor.');
  }

  onSend() {
    if (this.feedback) {
      this.feedbacksService.add(
        this.feedbacksService.activeProductId,
        this.feedback
      );
      this.feedback = '';
    }
  }
}
