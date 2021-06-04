import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AppConfig} from './../app.config'
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  constructor(private http: HttpClient) { }

  private readonly locType = new BehaviorSubject<any>({});
  readonly locType$ = this.locType.asObservable();

  getOnSiteTest() {
      return this.locType.getValue();
  }

  setOnSiteTest(data): void {
      this.locType.next(data);
  }

  getLocations(){
    return this.http.get(AppConfig.API_PATH + AppConfig.getLocations)
  }

  saveQuestionaire(body){
    return this.http.post(AppConfig.API_PATH + AppConfig.saveQuestionaire,body)
  }


}
