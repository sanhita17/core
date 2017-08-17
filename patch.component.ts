import { Component, ViewChild, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms'
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs/Rx';
import { ReferenceData } from '../../model/reference-data.model';
import { RssInfo } from './rss.component.model';
import { DropDownModelInfo } from './rss.dropdown';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { SafeHtml } from "@angular/platform-browser";
import { AbstractControl, NG_VALIDATORS, Validator, ValidatorFn } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ValidationService } from '../../formCustomValidators/form-custom-validators.service';
import { valueCheker } from './rss-temp-info.model';
import {JobPlaceMentModel } from './rss-job-placement.model';
import { DatePickerModule,DateModel  } from 'ng2-datepicker';
import * as moment from 'moment';


@Component({
  selector: 'app-client-rss',
  templateUrl: './rss.component.html',
  providers: [ClientService],
  styleUrls: ['./rss.component.css'],

})

export class RssComponent implements OnInit {
  stepsInvolved = ["RSS Intake", "RSS Profile", "Job Placement", "RSS Closure"];
  stepsCompleted = []; // doesnt include current step
  currentStep: number;

  private clientId;
  rssInfoIntake: FormGroup;
  rssInfoServices: FormGroup;
  rssJobInfo: FormGroup;
  rssClosure: FormGroup;
  dropDownValues: DropDownModelInfo[] = [];
  dropDownStatusCode: DropDownModelInfo = null;
  selectedService: '';
  selectedCapt: '';
  selectedServiceModel: DropDownModelInfo = null;
  cashAssistProgramTypes = [];
  programSources=[];
  healthBenefits=[];
  caseClosureReasons = [];
  isls = [];
  capt: "";
  dateModel: DateModel;
  showMe: boolean = false;
  allotment: valueCheker = null;
  jobplaced:JobPlaceMentModel[]=[];
  currIndex:number=-1;


  formErrors = {
    'closureDate': '',
    'intakeDate': ''
  };

  constructor(private fb: FormBuilder,
    private clientService: ClientService, private router: Router, private route: ActivatedRoute) {

    this.dateModel=new DateModel();
    this.dateModel.formatted="01-01-2001"
    this.allotment = new valueCheker("");


    this.cashAssistProgramTypes.push("None");
    this.cashAssistProgramTypes.push("TANF");
    this.cashAssistProgramTypes.push("RTCA");

    this.programSources.push("RSS");
    this.programSources.push("TAP");

    this.healthBenefits.push("YES");
    this.healthBenefits.push("NO");
    this.healthBenefits.push("");
    

    this.dropDownValues.push(new DropDownModelInfo('1', 'Employability Assessment', true, false, false, true, false));
    this.dropDownValues.push(new DropDownModelInfo('2', 'Case Management', true, false, false, true, false));
    this.dropDownValues.push(new DropDownModelInfo('3', 'Transportation Assistance', true, false, false, true, false));
    this.dropDownValues.push(new DropDownModelInfo('4', 'EAD Assistance', true, false, false, true, false));
    this.dropDownValues.push(new DropDownModelInfo('5', 'Child Care Assistance', true, false, false, true, false));
    this.dropDownValues.push(new DropDownModelInfo('6', 'Referral to Services', true, false, false, true, false));

    this.dropDownValues.push(new DropDownModelInfo('7', 'Energy Assistance', false, false, false, false, true));
    this.dropDownValues.push(new DropDownModelInfo('8', 'Medical Assistance', false, false, false, false, true));
    this.dropDownValues.push(new DropDownModelInfo('9', 'Uniform Assistance', false, false, false, false, true));
    this.dropDownValues.push(new DropDownModelInfo('10', 'Housing Assistance', false, false, false, false, true));
    this.dropDownValues.push(new DropDownModelInfo('11', 'Credential Evaluation Referral', false, false, false, false, true));
    this.dropDownValues.push(new DropDownModelInfo('12', 'Professional Licensing Assistance', false, false, false, false, true));

    this.caseClosureReasons.push("90 day job retention");
    this.caseClosureReasons.push("End of the eligibility period");
    this.caseClosureReasons.push("Reached 12 months of services");
    this.caseClosureReasons.push("Outmigrated to another state");
    this.caseClosureReasons.push("Noncompliance");
    this.caseClosureReasons.push("Health issues preventing employment");
    this.caseClosureReasons.push("At the request of client");

    this.isls.push("ESL");
  }

  validationMessages = {
    'closureDate': {
      'invalidDateFormat': 'Please Enter Valid date '
    },
    'intakeDate': {
      'invalidDateFormat': 'Please Enter Valid date '
    }
  };

  private constructFormObject() {
    this.rssInfoIntake = this.fb.group({
      clientId: [],
      alienNmbr: ['', [Validators.required, Validators.maxLength(9)]],
      snap: [],
      blank: [],
      benefit: [],
      cashAssistProgram: [],
      intakeDate: ['', [ValidationService.invalidDateFormat]]

    });


let datemodel1 = new DateModel();
            datemodel1.formatted = moment("1990-01-00").add(1, 'd').format('YYYY-MM-DD');

     this.rssInfoIntake.patchValue({
      clientId:"11",
      alienNmbr: "111",
      snap:"111",
      blank: "11",
      benefit: "123",
      cashAssistProgram: "12",
      intakeDate: datemodel1

    });
    this.dateModel=datemodel1;

    this.rssJobInfo = this.fb.group({
      clientId: [],
      alienNmbr: ['', [Validators.required, Validators.maxLength(9)]],
      jobStartDate: ['', [Validators.required]],
      jobType: ['', [Validators.required]],
      employerName: ['', [Validators.required]],
      companyAddrs: [''],
      employerPoc: [''],
      employerPhone: [''],
      employerEmail: [''],
      jobTitle: ['', [Validators.required]],
      fullOrPart: [''],
      hrsPerWeek: ['', [Validators.required]],
      hrlyWages: ['', [Validators.required]],
      monthlyWage: ['',[Validators.required]],
      healthBenefitid: ['', [Validators.required]],
      prgrmSrc: ['', [Validators.required]]
      
    });
    this.rssInfoServices = this.fb.group({
      services: this.fb.array([
      // this.initServices(),
      ])
    });

    this.rssClosure = this.fb.group({
      cashAssistProgramType: [Validators.required],
      caseClosureReason: [Validators.required],
      snap: [Validators.required],
      rtca: [Validators.required],
      closureDate: ['', [ValidationService.invalidDateFormat]]
    });

  }

  initServices() {
    return this.fb.group({
      isNa: [''],
      init: [''],
      completed: ['']
    });
  }

  addServices() {
    const control = <FormArray>this.rssInfoServices.controls['services'];
    control.push(this.initServices());
  }

  removeServices(i: number) {
    const control = <FormArray>this.rssInfoServices.controls['services'];
    control.removeAt(i);
  }

  ngOnInit() {
    this.currentStep = 1;
    this.constructFormObject();

    this.rssClosure.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

    console.log(this.dropDownValues);
  }

  onValueChanged(data?: any) {
    //alert("onValueChanged called");
    let closureForm: FormGroup;
    let intakeForm: FormGroup;

    if (this.rssClosure) {
      closureForm = this.rssClosure;
    }
    if (this.rssInfoIntake) {
      intakeForm = this.rssInfoIntake;
    }
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const closureControl = closureForm.get(field);
      const intakeControl = intakeForm.get(field);

      //alert("control : "+control+" control.dirty : "+control.dirty+" control.valid : "+control.valid);
      if (closureControl && closureControl.dirty && !closureControl.valid) {
        const messages = this.validationMessages[field];
        for (const key in closureControl.errors) {
          this.formErrors[field] += messages[key] + ' ';
          console.log("rssClosure :key : " + messages[key]);
        }
      }

      if (intakeControl && intakeControl.dirty && !intakeControl.valid) {
        const messages = this.validationMessages[field];
        for (const key in intakeControl.errors) {
          this.formErrors[field] += messages[key] + ' ';
          console.log("rssInfoIntake :key : " + messages[key]);
        }
      }
    }
  }

  addService() {
    this.selectedServiceModel.uiVisible = true;
    console.log(JSON.stringify(this.dropDownValues));
  }

  removeService(val) {
    let model: DropDownModelInfo;
    this.selectedServiceModel = this.dropDownValues.find(item => item.id == val);
    this.selectedServiceModel.uiVisible = false;
    this.selectedServiceModel.completed = false;
    this.selectedServiceModel.init = false;
    this.selectedServiceModel.isNa = false;
    this.selectedServiceModel.isNa = false;
    this.selectedServiceModel.isNa = false;
  }

  onSelectionChange(val) {
    this.selectedServiceModel = this.dropDownValues.find(item => item.id == val);
  }

  showVisibleList(input: boolean): DropDownModelInfo[] {
    return this.dropDownValues.filter(item => item.uiVisible == input);
  }

  onChange(event, model: DropDownModelInfo, type: number) {
    console.log("model triggered=>" + JSON.stringify(model));
    if (model.init && type == 2) {
      model.isNa = false;
      model.completed = false;
    }
    if (model.isNa && type == 1) {
      model.init = false;
      model.completed = false;
    }
    if (model.completed && type == 3) {
      model.init = false;
      model.isNa = false;
    }
    console.log("model triggered and changed=>" + JSON.stringify(model));
    console.log(JSON.stringify(this.dropDownValues));
  }

  getStepValue() {
    return this.currentStep;
  }

  stepFront() {
    this.stepsCompleted.push(this.stepsInvolved[this.currentStep - 1]);
    this.currentStep++;
    //  this.showMe=true;
  }

  stepBack() {
    this.stepsCompleted.pop();
    this.currentStep--;
    //  this.showMe=true;

  }

  validateAllotmentAmt(event) {

    let str: string = '^\\d+(\\.\\d+)?$';


    if (event.target.value.match(str)) {
      event.target.value = event.target.value;
    }
    else
    {
      event.target.value="";
    }
    // let isNotNumber = isNaN(event.target.value);
    // if(!isNotNumber){
    //     event.target.value = "$"+event.target.value;
    // }   
    // else{
    //    event.target.value = "$"; 
    //    console.log("values"+event.target.value );
    // }
  }


  // isNextbuttonEnabled = false;
  // isIntakeDateFilled = false;
  // enableNextButton(fieldName,event){
  //     //alert("val : "+event.target.value);
  //     if(fieldName=="intakeDate" && event.target.value!=""){
  //       this.isIntakeDateFilled = true;
  //     }


  //     if(this.isIntakeDateFilled){
  //       //$("nextBtn").css();
  //     }
  //   }


  callBackGetDate(val, type) {
    if (val) {
      if (val == 'Invalid date') {
        if (type == 'closureDate') {
          this.rssClosure.patchValue({
            closureDate: 'Invalid date'
          })
        }
    }
      if (val == 'Invalid date') {
        if (type == 'intakeDate') {
          this.rssInfoIntake.patchValue({
            intakeDate: 'Invalid date'
          })
          console.log("MSG");

        }
      }
       if (type == 'jobStartDate') {
        this.rssJobInfo.patchValue({
          jobStartDate: val
        })
      }
      if (type == 'closureDate') {
        this.rssClosure.patchValue({
          closureDate: val
        })
      }
      if (type == 'intakeDate') {
        this.rssInfoIntake.patchValue({
          intakeDate: val
        })
      }
      console.log("in callback mystringchaged=>" + JSON.stringify(val));
      this.onValueChanged();

    }
  }

  show() {
    console.log("yes...");
     this.showMe= false;
    // this.rssJobInfo=null;
    console.log("showme", this.showMe);
  }

editJobPlacementForm(id){
   this.showMe= false;
  let val=this.jobplaced.find(item => item.id == id)


this.rssJobInfo.patchValue({
      clientId: 123,
      alienNmbr:123,
      jobStartDate: val.jobStartDate,
      jobType: val.jobType,
      employerName: val.employerName,
      companyAddrs: val.companyAddrs,
      employerPoc:'',
      employerPhone: '',
      employerEmail: '',
      jobTitle: '',
      fullOrPart: '',
      hrsPerWeek: '',
      hrlyWages: '',
      monthlyWage:'',
      healthBenefitid:'',
      prgrmSrc: ''
      
    });

     this.showMe= false ;
// return this.jobplaced.filter(item => item.uiVisible == input);
}

removeJobPlacementForm(id){
  this.jobplaced = this.jobplaced.filter(item => item.id !== id);
    console.log("this.jobplaced.length", this.jobplaced.length);
    this.currIndex--;    
}

  public onSubmit({ value }: { value: any }) {
    console.log("Submitting the form here......");
    let employerName=this.rssJobInfo.get('employerName').value ;
    let jobStartDate=this.rssJobInfo.get('jobStartDate').value ;
    this.jobplaced.push(new JobPlaceMentModel(this.currIndex++, jobStartDate,employerName,'test1','test2'));
   this.showMe= true ;
 }

}
