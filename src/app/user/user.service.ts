import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse, HttpRequest, HttpHeaders, } from '@angular/common/http';
import { User } from './user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  //API_URL = 'http://localhost:8889';
  API_URL = environment.url3;
  api = environment.url + '/register';
  API = environment.url;
  constructor(private http: HttpClient) { }
  user: User;
  onClickOfSummary() {
    return this.http.get<User[]>(`${this.API_URL}/goamluser/fetchAll`);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.api + '/getUser/' + userId);
  }

 /* audit log comment  updateRecord(user: User) {
    let body = JSON.stringify(user);
    return this.http.put(this.API_URL + '/goamluser/update', body,httpOptions);
  }

  registerUserService(user: User) {
    let body = JSON.stringify(user);
    return this.http.post<User>(this.API_URL + '/goamluser/createUser', body, httpOptions);
  }  */ //end of audit log comment

  fetchRoleService() {
    return this.http.get<User>(this.API_URL + '/goamluser/fetchAllRoles' );

  }
  /* audit log */
  updateRecord(user: User,userName: string) {
    let body = JSON.stringify(user);
    return this.http.put<User>( `${this.API_URL}/goamluser/update/${userName}`, body,httpOptions);
  }
  registerUserService(user: User,userName: string) {
    let body = JSON.stringify(user);
    return this.http.post<User>(  `${this.API_URL}/goamluser/createUser/${userName}`, body, httpOptions);
  }
  /* end of audit log */
  getuseraudit(Object){
    return this.http.post<any>(  `${this.API}/UserandAudit/fetchData/`, Object);
  }
  authService(user:User,userName:string){
    let body = JSON.stringify(user);
    return this.http.put<User>( `${this.API_URL}/goamluser/authStatus/${userName}`, body,httpOptions);

  }

  ipAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
    
  } 
  
}
