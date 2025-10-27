import {Component, computed, effect, inject, OnDestroy, signal} from '@angular/core';
import {MovieCard} from '../movie-card/movie-card';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {MoviesService} from '../../../services/movies';
import {MovieModel} from '../../../models/movies.model';
import {Header} from '../../../shared/header/header';
import {Loader} from '../../../shared/loader/loader';
import {debounceTime, filter, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieCard,
    Header,
    Loader
  ],
  templateUrl: './movie-list.html',
  standalone: true,
  styleUrl: './movie-list.scss'
})
export class MovieList implements OnDestroy {

public movieService = inject(MoviesService);
  private route = inject(ActivatedRoute);


popularMovies = toSignal<MovieModel[]>(this.movieService.getPopularMovies(), { initialValue: null})
  searchMovies = signal<MovieModel[] | null>(null);
  searchStr = signal<string | null>(null);
filteredMovies = computed<MovieModel[]>(() => {
  const filteredMovies = this.searchStr()?.trim()
    ? this.searchMovies()
    : this.popularMovies();
  return filteredMovies ? [...filteredMovies] : [];
})
destroy$ = new Subject<boolean>();

  constructor() {
    const initial = this.route.snapshot.queryParams['search'] || '';
    this.searchStr.set(initial);

    toObservable(this.searchStr)
      .pipe(
        filter((str) => !!str),
        switchMap((str) => this.movieService.searchMovie(str!)),
        tap((searchMovies) => this.searchMovies.set(searchMovies)),
        takeUntil(this.destroy$),
      )

      .subscribe();

  }
onSearch(str: string) {
  this.searchStr.set(str.trim());
}

    ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
}
