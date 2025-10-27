import {Component, computed, input, signal} from '@angular/core';
import {MovieModel} from '../../../models/movies.model';
import {environment} from '../../../../environments/environment';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [
    RouterLink
  ],
  templateUrl: './movie-card.html',
  standalone: true,
  styleUrl: './movie-card.scss'
})
export class MovieCard {
    movie = input<MovieModel>();
   mediaUrl = signal(environment.mediaUrl);
   updatedMediaUrl = computed(() => `${this.mediaUrl()}${this.movie()?.poster_path}`);
}
