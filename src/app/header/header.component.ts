import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionnaireService } from '../services/questionnaire.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  location: any;

  constructor(private router : Router,private locSer : QuestionnaireService) { }

  ngOnInit(): void {
  }
  signIn(){
        this.router.navigate(['/employerLogin'])
      }
}
