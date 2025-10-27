import {Routes} from '@angular/router';
import {Main} from './main';
import {MovieList} from './components/movie-list/movie-list';
import {MovieDetails} from './pages/movie-details/movie-details';
import {movieDetailsResolver} from '../resolvers/movie-details-resolver';

export const mainRoutes: Routes = [
  {
    path: '',
    component: Main,
    children: [
      {
        path: '',
        component: MovieList
      },
      {
        path: 'movie/:movieId',
        component: MovieDetails,
        resolve: {movieDetails: movieDetailsResolver}
      }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },

];
