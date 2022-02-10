import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3001/api/v1/profile";
  constructor(private httpClient: HttpClient) { }
// recupere l'emble des profils
  public sendGetRequest()  {
    return this.httpClient.get(this.REST_API_SERVER);
  }

  // creer le filtre sur la BDD
  public registerUser(registerobj:any)  {
    console.log(registerobj)
     return this.httpClient.post('http://localhost:3001/register',registerobj, {observe:'response'}).subscribe(res =>{
      console.log("res");
      console.log(res);
    });
  }

  // recupere le filtre
  public getFiltre()  {
    return this.httpClient.get('http://localhost:3001/register');
  }

  // met a jour le filtre
  public updateFiltre(registeribj:any){
    return this.httpClient.put('http://localhost:3001/register',registeribj, {observe:'response'}).subscribe(res =>{
      console.log("res");
      console.log(res);
    });
    }


}
