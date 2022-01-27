import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

   /* CORS Issue :
   * Angular server by default serves on localhost:4200 (PORT 4200) and suppose
   * if your backend server is working on different port or domain, then the CORS
   * issue will inevitably occur.
   */

  //private REST_API_SERVER = "/api/v1/profile";
  private REST_API_SERVER = "http://localhost:3001/api/v1/profile";
  public test={};
  constructor(private httpClient: HttpClient) { }

  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }


  public registerUser(registerobj:object)  {
    console.log(registerobj)
     return this.httpClient.post('http://localhost:3001/register',registerobj).subscribe(res =>{
       this.test="1";
      console.log("res");
      console.log(res);
    });
  }

}
