import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render totalVotes correctly', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain('21');
  });

  it('should add highlight class while upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should be calling upVote on click of the link', ()=> {
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

    de.triggerEventHandler('click', null);

    expect(component.myVote).toBe(1);
  });
});
