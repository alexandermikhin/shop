import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeedbacksComponent } from './components/feedbacks/feedbacks.component';
import { FeedbacksService } from './services/feedbacks.service';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [FeedbacksComponent],
  exports: [FeedbacksComponent],
  providers: [FeedbacksService]
})
export class FeedbacksModule {}
