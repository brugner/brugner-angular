import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { RawHtmlPipe } from '../pipes/raw-html.pipe';
import { ReadingTimePipe } from '../pipes/reading-time.pipe';
import { TimeAgoPipe } from '../pipes/time-ago.pipe';
import { PostsService } from '../services/posts.service';
import { ViewPostComponent } from './view-post.component';


describe('ViewPostComponent', () => {
  let component: ViewPostComponent;
  let fixture: ComponentFixture<ViewPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        ViewPostComponent,
        TimeAgoPipe,
        ReadingTimePipe,
        RawHtmlPipe
      ],
      providers: [
        PostsService
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot({ closeButton: true, positionClass: 'toast-bottom-right' })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
