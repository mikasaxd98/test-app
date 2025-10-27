import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import { finalize} from 'rxjs';
import {MoviesService, requestInitialState} from '../services/movies';



export const globalHttpInterceptor: HttpInterceptorFn = (req, next) => {
const moviesService = inject(MoviesService);
moviesService.setCurrentHttpRequestState({...requestInitialState, isLoading: true})
  return next(req).pipe(
    finalize(() => {
      moviesService.setCurrentHttpRequestState({...requestInitialState, isLoading: false})})
  );
};
