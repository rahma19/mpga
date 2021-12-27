import { Injectable } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor() { }
  scroll(datasource:MatTableDataSource<any>){
    datasource.paginator = null;
    return datasource
   }
   page(datasource:MatTableDataSource<any>,paginator:MatPaginator,sort:MatSort){
    datasource.paginator = paginator;
    datasource.sort = sort;
    return datasource
   }
   getrow_nbr(datasource:MatTableDataSource<any>,paginator:MatPaginator,sort:MatSort,nbr:number){
   if(nbr!=null && nbr){
      datasource.paginator = paginator;
      datasource.sort = sort;
      return datasource
    }
  }
}