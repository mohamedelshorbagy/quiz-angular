import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
@Injectable()
export class DataService {

  constructor(private http:Http) { }

  getDepartmentData() {
    return this.http.get('http://localhost:4200/assets/data.json')
                    .map(res => res.json())
                    .map(res => res.departments);
  }

  getQuizesData() {
    return this.http.get('http://localhost:4200/assets/data.json')
                   .map(res => res.json())
                   .map(res => res.quizes);

  }

  getFormData() {
    return this.http.get('http://localhost:4200/assets/data.json')
                   .map(res => res.json())
                   .map(res => res.user);


  }


}
