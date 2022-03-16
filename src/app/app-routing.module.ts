import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ConsulterDocumentComponent} from "./consulter-document/consulter-document.component";
import {ArchiverDocumentComponent} from "./archiver-document/archiver-document.component";
import {StatsComponent} from "./stats/stats.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {path:'Home', component: HomeComponent},
  {path:'Add', component: ArchiverDocumentComponent},
  {path:'ListAll', component: ConsulterDocumentComponent},
  {path:'Stats', component: StatsComponent},
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full',
    component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
