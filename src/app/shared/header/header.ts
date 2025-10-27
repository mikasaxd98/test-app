import {AfterViewInit, Component, ElementRef, inject, OnDestroy, output, viewChild} from '@angular/core';
import {debounceTime, fromEvent, map, Subject, takeUntil, tap} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  standalone: true,
  styleUrl: './header.scss'
})
export class Header implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  searchEl = viewChild<ElementRef>('search');
  onStr = output<string>();
  destroy$ = new Subject<boolean>();


  ngAfterViewInit() {
    const el = this.searchEl()?.nativeElement;
    if (!el) return;

    el.value = this.route.snapshot.queryParams['search'] || '';
    fromEvent(this.searchEl()?.nativeElement, 'input').pipe(
      takeUntil(this.destroy$),
      debounceTime(500),
      map((event) => {
        return (event as any)?.target.value ;
      }),
      tap((str) => this.onStr.emit(str)),
      tap((str) => {
        if(str) {
          this.router.navigate([], {
            queryParams: {search: str},
            queryParamsHandling: 'merge',
          });
        } else {
          this.router.navigate([], {
            queryParams: {search: null},
            queryParamsHandling: 'merge',
          });
        }
      } )
    ).subscribe()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
