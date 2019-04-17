import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbacksService } from '../../services/feedbacks.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent {
  feedback = '';

  constructor(
    public feedbacksService: FeedbacksService,
    private router: Router
  ) {
  }


  onClose() {
    this.router.navigate(['/product', this.feedbacksService.activeProductId, { outlets: { feedback: null } }]);
    this.feedbacksService.isDisplayed = false;
  }

  onSend() {
    if (this.feedback) {
      this.feedbacksService.add(this.feedbacksService.activeProductId, this.feedback);
      this.feedback = '';
    }
  }
}
