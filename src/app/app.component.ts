import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  forbiddenUsernames = ['Yashu', 'Darling'];
  mySignupForm : FormGroup;

  ngOnInit(){
    this.mySignupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });

    // this.mySignupForm.valueChanges.subscribe(
    //   (value) => {console.log(value)}
    // );

    this.mySignupForm.statusChanges.subscribe(
      (status) => {console.log(status)}
    );

    this.mySignupForm.setValue({
      'userData' : {
        'username' : 'Yaswanth Bonda',
        'email' : 'yashu.thedevil@gmail.com'
      },
      'gender' : 'male',
      'hobbies' : []
    })
  }

  onSubmit(){
    console.log(this.mySignupForm);
    this.mySignupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.mySignupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.mySignupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) != -1){
      return {'nameIsForbidden': true}
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=> {
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      }, 2000);
    });
    return promise;
  }
}
