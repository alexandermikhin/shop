import { Injectable } from '@angular/core';

@Injectable()
export class FeedbacksService {
  isDisplayed = false;
  activeProductId: number;

  private feedbacks = new Map<number, string[]>();

  add(productId: number, feedback: string) {
    const date = new Date();
    const feedbacks = this.feedbacks.get(productId) || [];
    feedbacks.push(`${feedback} (${date.toLocaleString()})`);
    this.feedbacks.set(this.activeProductId, feedbacks);
  }

  getAll(productId: number): string[] {
    return this.feedbacks.get(productId);
  }
}
