import {Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly authToken = signal(environment.authToken);

}
