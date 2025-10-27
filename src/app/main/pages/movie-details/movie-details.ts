import {Component, computed, inject, input, signal} from '@angular/core';
import {MovieDetailsResponse} from '../../../models/movie-details.model';
import {environment} from '../../../../environments/environment';
import {NgOptimizedImage} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Loader} from '../../../shared/loader/loader';
import {MoviesService} from '../../../services/movies';

@Component({
  selector: 'app-movie-details',
  imports: [
    NgOptimizedImage,
    RouterLink,
    Loader
  ],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss',
  standalone: true
})
export class MovieDetails {
  private route = inject(ActivatedRoute);
  public movieService = inject(MoviesService);


  movieId = input.required<number>();
  movieDetails = signal<MovieDetailsResponse | null>(this.route.snapshot.data['movieDetails']);
  mediaUrlBigImg = signal(environment.mediaUrlBigImg);
  updatedMediaUrlBigImg = computed(() => `${this.mediaUrlBigImg()}${this.movieDetails()?.backdrop_path}`);
  mediaUrl = signal(environment.mediaUrl);
  updatedMediaUrl = computed(() => `${this.mediaUrl()}${this.movieDetails()?.poster_path}`);


}
