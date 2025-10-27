import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import { map, Observable} from 'rxjs';
import {MovieModel, MovieResponse} from '../models/movies.model';
import {MovieDetailsResponse} from '../models/movie-details.model';


/// request errors of http request check in global-http-interceptor.ts.

interface RequestState {
  isLoading: boolean;
}

export const requestInitialState: RequestState = {
  isLoading: false
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = signal(environment.apiUrl);
  private readonly requestState = signal<RequestState>(requestInitialState);
  public readonly currentHttpRequestState = computed(() => this.requestState())

  public getPopularMovies(): Observable<MovieModel[]> {
    return this.http.get<MovieResponse>(`${this.apiUrl()}/movie/popular`).pipe(
      map(({results}) => {
        return results
      })
    );
  }


  public getMovieDetails(id: number): Observable<MovieDetailsResponse> {
    return  this.http.get<MovieDetailsResponse>(`${this.apiUrl()}/movie/${id}?language=en-US`)
  }


  public searchMovie(str: string): Observable<MovieModel[]> {
    let params = new HttpParams().set('query', str).set('language','en-US');
    return this.http.get<MovieResponse>(`${this.apiUrl()}/search/movie`, {params}).pipe(
      map(({results}) => {
        return results
      })
    );
  }


  public setCurrentHttpRequestState(requestState:RequestState) {
    this.requestState.set({...requestState});
  }

}
