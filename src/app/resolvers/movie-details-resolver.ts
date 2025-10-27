import {RedirectCommand, ResolveFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {MoviesService} from '../services/movies';
import {MovieDetailsResponse} from '../models/movie-details.model';
import {catchError} from 'rxjs';

export const movieDetailsResolver: ResolveFn<MovieDetailsResponse | boolean> = (route, state) => {
  const router = inject(Router);

  return inject(MoviesService).getMovieDetails(+route.paramMap.get('movieId')!).pipe(
    catchError(() => router.navigateByUrl('/'))
  )
};
