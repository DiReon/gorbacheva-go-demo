import { TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'gorbacheva-go-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gorbacheva-go-demo');
  });

  it('should have router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    let de = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(de).not.toBeNull();
  })


});
