import { Component, OnInit, DoCheck } from '@angular/core';
import {DataService} from './services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService]
})
export class AppComponent implements DoCheck{
  schools:any;
  departments:any;
  department:any;
  quizes:any;
  quiz:any;
  formData:FormGroup;
  formDynamic:any;
  all:any;
  schoolClicked = false;
  constructor(private data:DataService) {}


  /* LifeCycle Hooks */ 
  ngDoCheck() {
    if(this.formDynamic) {
        let email = this.formData.get('email');
        let phone = this.formData.get('phone');

        email.valueChanges.subscribe((value) => {
          if(!value) {
            phone.disable({emitEvent: false})
          } else {
            phone.enable({emitEvent: false})
          }
        })
    }
  }


  /* Start Function For Schools Button */
  startGame() {
    this.schoolClicked = true;
  }
  /* 
    Functionality : When User Choose a School Then we make a fake request to get the data
  */

  schoolsChange() {
    this.data.getDepartmentData().subscribe(res => {
      this.departments = res;
    });

  }

  /* 
    Functionality : When User Choose a Department Then we make a fake request to get the data depend on his/her choice
  */

  departmentChange() {
    this.data.getQuizesData().subscribe(res => {
      this.quizes = res;
    })
  }

  /* 
    Functionality : When User Choose a Quiz Then we make a fake request to get the data depend on the quiz he made to get the dynamic Form
  */


  quizChange() {
    this.data.getFormData().subscribe(res => {
      this.formDynamic = res.form;
      let controls = {};
        res.form.forEach(element => {
          if(element.type != 'submit') {
            controls[element.value] = new FormControl(null, Validators.required)
          }
      })
      this.formData = new FormGroup(controls);
        let email = this.formData.get('email');
        let phone = this.formData.get('phone');
        phone.disable(email.touched);
      
    })
}




  
/*

  Functionality : to output all user choices in the console 

*/
  formSubmit() {
    this.all = {
      school:this.schools,
      department:this.department,
      quiz:this.quiz,
      userData: this.formData.value
    }

    console.log(this.all);

  } 






}
