//import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user-management/user';
import { APIService } from './api.service';
import { Login } from './login/login';
import { Component, OnDestroy, HostListener } from '@angular/core';
import { NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserIdleService } from 'angular-user-idle';
import { filter } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';


export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/*export class AppComponent {
  // title = 'app';

  user :Observable<User>
  userType:string;

  constructor(private apiService: APIService) { }


ngOnInit()
{

}

} */
export class AppComponent implements OnDestroy {
  // @HostListener('mouseup', ['$event'])
  //   @HostListener('mousemove', ['$event'])
  //   onEvent(event: MouseEvent) {
       
  //       localStorage.setItem('time-limit', "clear-now");
  //   }
  //   @HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
  //       localStorage.setItem('time-limit', "clear-now");
  //   }
    
  name = 'Angular 6';
  subscription: Subscription;
  routervalueexist:boolean=false;
  appTitle = 'GOAML';
  pageTitle = '';
  userActivity:any;

  constructor(private apiService: APIService,
    private userIdle: UserIdleService, 
    private routePartsService: APIService,
    public title: Title, 
    private activeRoute: ActivatedRoute,
    private router: Router) {
    this.subscription = router.events.subscribe((event) => {
      let sessionvalue = sessionStorage.getItem('logout');
      if(router.url.length > 1 && !this.routervalueexist)
      {
         this.apiService.storeroutername(router.url);
         this.routervalueexist = true;
      }
    });
  }

  ngOninit(){
    //this.userIdle.startWatching();
         //Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting and reset if user action is there.
  /*  this.userIdle.onTimerStart().subscribe(count=> {
    var eventList= ['click', 'mouseover', 'keydown', 'DOMMouseScroll', 'mousewheel',
    'mousedown','touchstart','touchmove','scroll','keyup'];
    for(let event of eventList) {
    document.body.addEventListener(event, () =>this.userIdle.resetTimer());
    }
    });
    // Start watch when time is up.
  this.userIdle.onTimeout().subscribe(() => {
    alert('Your session has expired click on OK to resume the application.');
  }) */
    
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  // changePageTitle() {
  //   this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((routeChange) => {
  //     var routeParts = this.routePartsService.generateRouteParts(this.activeRoute.snapshot);
  //     if (!routeParts.length)
  //       return this.title.setTitle(this.appTitle);
  //     // Extract title from parts;
  //     this.pageTitle = routeParts
  //                     .reverse()
  //                     .map((part) => part.title )
  //                     .reduce((partA, partI) => {return `${partA} > ${partI}`});
  //     this.pageTitle += ` | ${this.appTitle}`;
  //     this.title.setTitle(this.pageTitle);
  //   });
  // }
  

  logout(count) {
    // console.log('method call', count);
     localStorage.removeItem('userFromLogin');
    
     this.router.navigate(['/', 'login']);
     localStorage.clear();
     //window.location.reload();
   }
   stop() {
    this.userIdle.stopTimer();
  }
 
  stopWatching() {
    this.userIdle.stopWatching();
  }
 
  startWatching() {
    this.userIdle.startWatching();
  }
 
  restart() {
    this.userIdle.resetTimer();
  }

}
