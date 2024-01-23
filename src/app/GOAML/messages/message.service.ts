import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpRequest, HttpHeaders, } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import {environment} from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MessageService {
  api= environment.url+'/message/getMessagingPage';
  api1= environment.url+'/message/getMessage1';
  apiFormessageDate=environment.url+'/message/getMessages';
  //getMessages
  constructor(private http: HttpClient) { }

  getAllMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.apiFormessageDate);
  }
  getMessage(msgId:any) : Observable<any> {
    return this.http.get(`${this.api1}/${msgId}` )
   
  }
}
