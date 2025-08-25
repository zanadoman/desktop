import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    window.electronAPI = {
      log: jasmine.createSpy('log')
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    fixture.detectChanges();
  });

  it('should render title', () => {
    const title = fixture.debugElement.query(
      By.css('[data-testid="app-title"]')
    ).nativeElement;
    expect(title.textContent).toBe('Hello, Desktop');
  });

  it('should render count', () => {
    const count = fixture.debugElement.query(
      By.css('[data-testid="app-count"]')
    ).nativeElement;
    expect(count.textContent).toBe(' 0 ');
  });

  it('should decrement count', () => {
    const decrement = fixture.debugElement.query(
      By.css('[data-testid="app-decrement"]')
    ).nativeElement;
    const count = fixture.debugElement.query(
      By.css('[data-testid="app-count"]')
    ).nativeElement;
    for (let i = 0; -10 < i; i--) {
      decrement.click();
      fixture.detectChanges();
      expect(count.textContent).toBe(` ${i - 1} `);
      expect(window.electronAPI.log).toHaveBeenCalledWith(`Count: ${i - 1}`);
    }
  });

  it('should increment count', () => {
    const increment = fixture.debugElement.query(
      By.css('[data-testid="app-increment"]')
    ).nativeElement;
    const count = fixture.debugElement.query(
      By.css('[data-testid="app-count"]')
    ).nativeElement;
    for (let i = 0; i < 10; i++) {
      increment.click();
      fixture.detectChanges();
      expect(count.textContent).toBe(` ${i + 1} `);
      expect(window.electronAPI.log).toHaveBeenCalledWith(`Count: ${i + 1}`);
    }
  });
});
