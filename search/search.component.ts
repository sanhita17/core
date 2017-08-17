	import { Component, OnInit,Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ClientSearchRequest } from './clientSearchRequest.model';
import { ClientSearchResult } from './clientSearchResult.model';
import { ClientService } from '../client.service';
import { Observable } from 'rxjs/Rx';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { ElementRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { DatePipe } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
	import { PaginationInstance } from 'ngx-pagination';
  import * as moment from 'moment'


@Component({
  selector: 'client-search',
  templateUrl: './search.component.html',
  providers: [ClientService,DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  dob : Date;
  dateOfEntry: Date;
  dateOfEntry1: Date;
  mymodel='';
  clientSearchRequest : FormGroup;
  clientSearchResults : ClientSearchResult[];
  clientSearchResultsAvailable = false;
  date: DateModel;
  options: DatePickerOptions;
   currentSearchRequest = {};

   		
   p: number = 1;		
    total: number;		
    loading: boolean;		
    totalElements: number;


  public elementRef;
    constructor(myElement: ElementRef,		  
                private ref: ChangeDetectorRef,		
                private fb: FormBuilder, private clientService: ClientService, private _sanitizer: DomSanitizer,private router: Router,private datePipe: DatePipe) { this.elementRef = myElement;
       this.options = new DatePickerOptions();
  }

 public alienNumbers=[];
 page:number = 0;		
    size:number = 2;

   autocompleListFormatter = (data: any) : SafeHtml => {
      let html = `<span>${data}</span>`;
      return html;
  }

  ngOnInit() {
    this.clientSearchRequest = this.fb.group({
      alienNmbr: ['', [ Validators.maxLength(9)]],
      firstName: ['',[Validators.minLength(1)]],
      lastName: ['',[Validators.minLength(2)]],
      dateOfBirth: [''],
      entryDate: ['',[Validators.minLength(10),Validators.maxLength(10)]]
    });

 let dateEvent=new Date();
 
  let datemodel=new DateModel();
 datemodel.formatted=moment(dateEvent).add(1,'d').format('YYYY-MM-DD'); 
 console.log("re-formatted date :"+datemodel.formatted);
   
  let checkdate=new Date(datemodel.formatted);
 this.clientSearchRequest.patchValue({
    entryDate:'yyyy-mm-dd'
  });
  

    this.clientSearchRequest.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }
  formErrors = {
      'alienNmbr': '',
      'firstName': '',
      'lastName': '',
       'entryDate': {
    'required' : 'Entry Date is required.'
    },
      'dateOfBirth':''
    };

    getPage(page: number) {		
       console.log(" page: " + page);		
        this.loading = true;		
        this.p = page;		
        		
        this.clientService.getClientSearchResults(this.currentSearchRequest, page-1, this.size).subscribe(		
        data => {		
          console.log(" success " + data);		
        		
        this.loading = false;		
        this.clientSearchResultsAvailable = true;		
        this.clientSearchResults = data.content;		
        this.totalElements = data.totalElements;		
        this.ref.markForCheck();		
        },		
        errors => {console.log("Eror in getting the results " + errors)},		
        () => {console.log("Done")}		
      );		
    }

  onValueChanged(data?: any) {
  if(data){
     console.log("data:"+ JSON.stringify(data));
    if(data.entryDate){
  // data.entryDate=data.entryDate["formatted"];
   data.entryDate= this.datePipe.transform(data.entryDate["formatted"], 'MM/dd/yyyy');
   console.log("data.entryDate:"+data.entryDate);
  }
  }
    if (!this.clientSearchRequest) { return; }
    const form = this.clientSearchRequest;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  validationMessages = {
    'alienNmbr': {
      'maxlength':'Alien Number cannot be more than 9 digits.',
      'pattern': 'Not a valid Number'
    },
    'firstName': {
      'minlength': 'Atleast 2 characters is required.'
    },
    'lastName': {
      'minlength': 'Atleast 2 characters is required.'
    },
  };

 onSubmit({ value }: { value: ClientSearchRequest }) {
     console.log( "value.entryDate " + value.entryDate);
    this.currentSearchRequest = value;
   
    if(this.dob){
      console.log("this.dateOfBirth " + this.dob);
      value.dateOfBirth= this.datePipe.transform(this.dob, 'MM/dd/yyyy');
    }
    this.clientService.getClientSearchResults(value, 0, this.size).subscribe(
      data => {
        console.log(" success ",  data);
        this.clientSearchResultsAvailable = true;
        this.clientSearchResults = data.content;
        this.totalElements = data.totalElements;
         this.ref.markForCheck();
      },
      errors => {console.log("Eror in getting the results " + errors)},
      () => {console.log("Done")}
    );
       console.log("after teh service call");
  }

  cancel(e){
    console.log("Cancel clicked---->")
    e.preventDefault();
    this.clientSearchRequest.reset();
    this.clientSearchResultsAvailable = false;
    this.clientSearchResults = null;
  }

 autoCompleteValuechange(pattern) {
   this.mymodel=pattern;
  console.log("Value pattern:" +pattern);
if(pattern){
  if (pattern.length!=0)
        {
    this.clientService.getAlienNbrsAutoCompleteResults(pattern).subscribe(
      data => {
         this.alienNumbers.length = 0 ;
          for (var i = 0; i < data.length; i++) {
             let temp={"alienNmbr": JSON.parse(JSON.stringify(data[i])).alienNmbr}
             console.log(" success :alien ids returned for =>" + pattern+": "+data[i]);
          this.alienNumbers.push(temp.alienNmbr);
         }
      },
      errors => {console.log("Eror in getting the results " + errors)},
      () => {console.log("Done")}
    );
  }
  else
  {
    this.alienNumbers.length = 0 ;
  }
}
}


dateFocusEvent(value,valType){
  console.log("entered  dateFocusEvent()");
  try
  {
     console.log("dateValue "+value);
    if(value){
 let dateEvent=new Date(value);
 
  let datemodel=new DateModel();
 datemodel.formatted=moment(dateEvent).add(1,'d').format('YYYY-MM-DD'); 
 console.log("re-formatted date :"+datemodel.formatted);
   
 this.clientSearchRequest.patchValue({
    entryDate:datemodel
  });
  console.log("exited  dateFocusEvent()");  
  }  
}
catch(e)
{
   console.log("error in  dateFocusEvent()");
  let datemodel=new DateModel();
 datemodel.formatted=moment("1990-01-00").add(1,'d').format('YYYY-MM-DD'); 

   this.clientSearchRequest.patchValue({
    entryDate:datemodel
  });
  console.log("mapped to 1990");  
}
}
}

