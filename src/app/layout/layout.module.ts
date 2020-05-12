import { CommonModule } from '@angular/common';
import { NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule}from '@angular/material/select';
import {MatCardModule}from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { NotesComponent } from './notes/notes.component';
import {ShowPostComponent} from './show-post/show-post.component';
import {MobileDashboardComponent} from './mobile-dashboard/mobile-dashboard.component';
import {DocumentComponent} from './documents/documents.component';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';  
@NgModule({
    imports: [
        CommonModule,
        NgbModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        MatSelectModule,
        MatCardModule,
        MatExpansionModule,
        MatTableModule,
        MatGridListModule,
        TranslateModule,
        MatTabsModule,
        NgxPageScrollModule,
        FlexLayoutModule,
        FormsModule,
        ScrollToModule.forRoot()
    ],
    declarations: [NotesComponent,DocumentComponent,ShowPostComponent,MobileDashboardComponent, LayoutComponent, NavComponent, TopnavComponent,  ]

})
export class LayoutModule { }
