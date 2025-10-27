export interface MovieModel {
  backdrop_path: string;
  id: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  vote_count: number;
  title: string;
  original_title: string;
  overview: string;
  original_language: string;
  adult: boolean;
  genre_ids: number[];

}

export interface MovieResponse {
  page: number;
  results: MovieModel[]
  total_pages: number
  total_results: number;
}
