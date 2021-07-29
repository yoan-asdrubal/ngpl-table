import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {filter, map, mergeMap, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  loading = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = 'Examples';
  navigation = [
    {
      path: '/ngpl-datatable', title: 'Datatable'
    }, {
      path: '/ngpl-table', title: 'New Table'
    }
  ];


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private breakpointObserver: BreakpointObserver) {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      , map(() => this.activatedRoute)
      , map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      // , filter(route => route.outlet === 'primary')
      , mergeMap(route => route.data)
    ).subscribe((event) => this.title = event['title'] || 'Examples');
  }

  showProcessing(): void {
    this.loading = true;
  }

  hideProcessing(): void {
    this.loading = false;
  }
}
