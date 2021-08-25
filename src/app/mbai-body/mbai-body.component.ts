import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { User } from '../models/user';
import { QuestionnaireService } from './../services/questionnaire.service'
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
// import { Options } from '@m0t0r/ngx-slider';
import { Options } from 'ng5-slider';
import {  RxTranslateModule, RxTranslation, translate } from '@rxweb/translate';
declare var Slider: any;



@Component({
  selector: 'app-mbai-body',
  templateUrl: './mbai-body.component.html',
  styleUrls: ['./mbai-body.component.scss']
})
export class MbaiBodyComponent implements OnInit {
  @translate({ translationName: "global" })
  mlc: { [key: string]: any }
  // @translate({ translationName: "" })
  // mlc_common: { [key: string]: any }
  title = 'mHealthMobile';
  isSubmitted = false;
  public userInputs: User = new User();
  errorCorrectionLevel = 'M'
  public myAngularxQrCode: string = null;
  public qrCodeScanner: boolean = false;
  public qrCodeCleared: boolean = false;
  initialLoc:any
  employeeVal : boolean = false;
  value: number;
  options: Options = {
    showTicksValues: true,
    stepsArray: [
      { value: 0, legend: 'Not Comfortable' },
      { value: 1},
      { value: 2 },
      { value: 3 },
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10, legend: 'Comfortable' }
    ]
  };
  validUntil: string;
  validUntilTimeZone: string;
  //     "ques2": "Have You Been Tested For COVID-19 And Are Awaiting Your Tested Results?",

  questionire1 = {
    "ques1": "HAVE YOU HAD ANY COVID-19 SYMPTOMS IN THE LAST 24 HOURS? (COMMON SYMPTOMS INCLUDE LOSS OF SMELL OR TASTE, HEADACHE, FATIGUE, COUGH AS WELL AS FEVER OR DIFFICUTLY BREATHING)",
    "ques2": "HAVE YOU TESTED POSITIVE FOR COVID-19 IN THE LAST 10 DAYS? ",
    "ques3": "ARE YOU CURRENTLY AWAITING COVID-19 TEST RESULTS (WHEN THE TEST IS BASED ON EXPOSURE OR SYMPTOMS)? ",
    "ques4": "HAVE YOU BEEN ASKED TO QUARANTIVE BY A GOVERNMENT, PUBLIC HEALTH AUTHORITY OR YOUR EMPLLYER BECAUSE OF TRAVEL OR POTENTIAL EXPOSURE? ",
    "ques5": "HAVE YOU BEEN IN CLOSE CONTACT WITH ANYONE WHO HAS TESTED POSIVITE IN THE LAST 10 DAYS?",
    "ques6": "Do you agree to abide by Nike's safety precautions including but not limited to social distancing, wearing face coverings and hand sanitizing?",
  }

  locations: any[] = [];
  @ViewChild('screen') screen: ElementRef;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('downloadLink') downloadLink: ElementRef;
  istTime: any;
  min = 0;
  max = 10;
  @ViewChild('myRange')
  myRange: ElementRef;
  qrData: any;
  qrDataToDisplay: string;
  error: boolean = false;
  selectedLanguage:any;
  languages = [
      {name: 'English', code: 'en'},
      {name: 'Spanish', code: 'es'}
  ]
  selectedLoc: any;
  days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dateSpec = new Date();
  constructor(private queSer: QuestionnaireService,private translate: RxTranslation) {
  }
  ngOnInit() {
    if (localStorage.getItem('lang')) {
      this.translate.change(localStorage.getItem('lang'));
      this.selectedLanguage = localStorage.getItem('lang')
    }else{
      this.selectedLanguage = 'en'
    }
    // this.userInputs.rating = 5;
    // this.getLocations();
  }
  sliderRange(eve) {
    console.log(eve);
    this.userInputs.rating = eve.target.value
  }
  onSubmit() {
    this.isSubmitted = true;
    console.log('SUCCESS!!', this.userInputs);
    let date = new Date();
    let dateTime = new Date(new Date(date).getTime() + 60 * 60 * 24 * 1000);
    let shortTimeZone = this.tzAbbr(dateTime);
    this.validUntil = undefined

    var req = {
      "accountId": 2085,
      "locationId": 2078,
      "firstName": this.userInputs.firstName,
      "lastName": this.userInputs.lastName,
      // "phoneNumber": this.userInputs.phoneNumber,
      "rating": this.userInputs.rating,
      "suggestions": this.userInputs.suggestions,
      //"userTimeZone": dateTime.toString()
    };
      let questionResponse = [];
      Object.keys(this.questionire1).forEach(q => {
        let obj = {
          "question": this.questionire1[q],
          "response": this.userInputs[q]
        }
        questionResponse.push(obj)
      });
      req["questionResponse"] = questionResponse;
      console.log(req);
    this.queSer.saveQuestionaire(req).subscribe((res: any) => {
      if (res.statusCode != 500) {
        console.log(res);
        this.qrData = res;
        let validDatee = res.validity ? new Date(res.validity.split(/[ ,]+/).join('T') + 'Z').toLocaleString() : ''
        this.validUntil = validDatee.split(',')[0];
        this.validUntilTimeZone =  new Date(validDatee).toTimeString()
        let status = this.qrData.isCleared ? 'Cleared' : 'Not Cleared'
        this.qrDataToDisplay = 'Employee Name : ' + this.qrData.employeeName + ', \n' + 'Status : ' + status + ', \n' + 'Valid till : ' + this.qrData.validity;
        this.qrCodeScanner = true
      } else {
        this.qrCodeScanner = false;
      }

    })
  }

  getLocations() {
    this.queSer.getLocations().subscribe((res: any) => {
      if (res.status != 'Failure') {

        // localStorage.setItem('locations',JSON.stringify(res))
        this.locations = res; //JSON.parse(localStorage.getItem('locations'));
        console.log(this.locations);
        this.userInputs.locationId = this.locations.length > 0 ? this.locations[0].id : undefined;

      } else {
        this.error = true;
        this.locations = [];
        //this.toaster.error(res.message, 'Error')
      }
    })

  }
  downloadjpg() {
    html2canvas(this.screen.nativeElement).then(canvas => {
      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/jpeg');
      this.downloadLink.nativeElement.download = 'MBAI-Qr-scan';
      this.downloadLink.nativeElement.click();
    });
  }

  tzAbbr(dateInput) {
    var dateObject = dateInput || new Date(),
      dateString = dateObject + "",
      tzAbbr: any = (
        // Works for the majority of modern browsers
        dateString.match(/\(([^\)]+)\)$/) ||
        // IE outputs date strings in a different format:
        dateString.match(/([A-Z]+) [\d]{4}$/)
      );

    if (tzAbbr) {
      // Old Firefox uses the long timezone name (e.g., "Central
      // Daylight Time" instead of "CDT")
      tzAbbr = tzAbbr[1].match(/[A-Z]/g).join("");
    }

    return tzAbbr;
  };
  changeLanguage(languageCode: string) {
    console.log('rxtran', RxTranslation)
    localStorage.setItem('lang', languageCode)
    this.translate.change(languageCode);
}
onFormPage(){
  this.employeeVal = true;
  this.qrCodeScanner = false
}


}
