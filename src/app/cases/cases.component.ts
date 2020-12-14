import {Component, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../services/api.service';
import { Cases } from '../model/cases';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'status', 'country'];
  data: Cases[] = [];
  selectedRow: number;
  editedRows: boolean[];

  data1: Cases[];
  isLoadingResults = true;
  term;
  userListMatTabDataSource =  new MatTableDataSource<Cases>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getData();
    console.log(this.data1);
    this.editedRows = [];
    this.userListMatTabDataSource.paginator = this.paginator;
    this.userListMatTabDataSource.sort = this.sort;
  }
  getColor(status) {
    switch (status) {
      case "Recovered":
        return "green";
      case "Dead":
        return "red";
      case "Positive":
        return "orange";
    }
  }
  applyFilter(filterValue: string) {
    this.userListMatTabDataSource.filter = filterValue.trim().toLowerCase();
  }
  rowClick(rowId) {
    this.selectedRow = rowId;
    console.log(this.selectedRow);
  }
  getData(){
    this.api.getCases()
      .subscribe((res: any) => {
        this.data1 = res;
        console.log(this.data1);
        this.userListMatTabDataSource.data = this.data1 ;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
