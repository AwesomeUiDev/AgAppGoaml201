import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpRequest, HttpHeaders, } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
// import { User } from '../user/user';
import { ErrorMessageService } from '../error-message/error-message.service';
import { Authorize } from './authorize';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeXmlService {
  api= environment.url+'authorize/getAuthorize';
  
  constructor(private http: HttpClient,
   private  errorMessageService:ErrorMessageService) { }

   getAuthorizeXml(): Observable<Authorize[]> {
     console.log(this.api);
    return this.http.get<Authorize[]>(this.api);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }



  /** Log a AuthorizeService message with the ErrorMessageService */
  private log(message: string) {
    this.errorMessageService.add(`AuthorizeXmlService : ${message}`);
  }
}
