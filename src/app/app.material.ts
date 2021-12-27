import { NgModule } from '@angular/core';

    import { MatPaginatorModule } from '@angular/material/paginator';
    import { MatSortModule } from '@angular/material/sort';
    import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
    import { MatIconModule } from '@angular/material/icon';
    import { MatDialogModule } from '@angular/material/dialog';
    import { MatCardModule } from '@angular/material/card';
    import { MatSidenavModule } from '@angular/material/sidenav';
    import { MatButtonModule } from '@angular/material/button';
    import { MatInputModule } from '@angular/material/input';
    import { MatNativeDateModule } from '@angular/material/core';
    import { MatTableModule } from '@angular/material/table';
    import { MatMenuModule } from '@angular/material/menu';
    import { MatAutocompleteModule } from '@angular/material/autocomplete';
  
    



    import {MatSelectModule} from '@angular/material/select';
    import {MatGridListModule} from '@angular/material/grid-list';
    //import {} from '@angular/material/button';
    import {MatDatepickerModule} from '@angular/material/datepicker'
    import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
    imports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatInputModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ],
    declarations: [
       
    ],
    exports: [
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatAutocompleteModule,
        MatInputModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule
    ]
})
export class MatModule{}