import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MbaiBodyComponent } from './mbai-body/mbai-body.component';


const routes: Routes = [
  {
    path : '',
    component : MbaiBodyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
