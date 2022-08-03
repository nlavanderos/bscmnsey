import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

const jasmine = require('jasmine');

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    jasmine.expect(app).toBeTruthy();
  });

  it(`should have as title 'buscaminas'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    jasmine.expect(app.title).toEqual('buscaminas');
  });
});
