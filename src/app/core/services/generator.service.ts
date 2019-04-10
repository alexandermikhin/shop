import { Injectable } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private availableChars: string[] = [];

  constructor() {
    this.initAvailableChars();
  }

  getSequence(length: number): string {
    let sequence = '';
    const availableCharsLength = this.availableChars.length;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < length; i++) {
      sequence += this.availableChars[Math.floor(Math.random() * availableCharsLength)];
    }

    return sequence;
  }

  private initAvailableChars() {
    this.availableChars = this.generateSequence('A', 'Z');
    this.availableChars = this.availableChars.concat(
      ...this.generateSequence('a', 'z')
    );
    this.availableChars = this.availableChars.concat(
      ...this.generateSequence('0', '9')
    );
  }

  private generateSequence(start: string, end: string): string[] {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    const sequence: string[] = [];
    for (let i = startCode; i <= endCode; i++) {
      sequence.push(String.fromCharCode(i));
    }

    return sequence;
  }
}
