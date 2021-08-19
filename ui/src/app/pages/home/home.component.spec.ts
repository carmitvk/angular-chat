import { OverlayContainer } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { FooterComponent } from 'src/app/core/layout/footer/footer.component';
import { HeaderComponent } from 'src/app/core/layout/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './home.component';

const backgroundTaskMock = {
  loading: false,
}

const backgroundViewerMock = {
  initialize: () => { },
}

const authMock = {
  authData$: of(null),
}

const overlayMockService = {
  getContainerElement: () => { },
}

const themeMockService = {
  currentTheme$: new BehaviorSubject(null),
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [
        HomeComponent,
        HeaderComponent,
        FooterComponent,
      ],
      providers: [
        { provide: OverlayContainer, useValue: overlayMockService },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change overlay theme class', () => {
    const firstTheme = 'firstTheme';
    const secondTheme = 'secondTheme';
    const containerSpy = jasmine.createSpyObj('containerSpy', [], {
      classList: {
        remove: jasmine.createSpy(),
        add: jasmine.createSpy(),
      },
    });

    spyOn(overlayMockService, 'getContainerElement').and.returnValue(containerSpy);

    expect(containerSpy.classList.add).toHaveBeenCalledWith(firstTheme);

    expect(containerSpy.classList.remove).toHaveBeenCalledWith(firstTheme);
    expect(containerSpy.classList.add).toHaveBeenCalledWith(secondTheme);

    themeMockService.currentTheme$.next(null);
    expect(containerSpy.classList.remove).toHaveBeenCalledWith(secondTheme);
  });
});
