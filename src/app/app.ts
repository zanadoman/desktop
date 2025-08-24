import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Desktop');
  protected readonly count = signal(0);

  protected decrement(): void {
    this.count.update(value => value - 1);
  }

  protected increment(): void {
    this.count.update(value => value + 1);
  }
}
