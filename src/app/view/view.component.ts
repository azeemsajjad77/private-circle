import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view',
  templateUrl: 'view.component.html',
  styleUrls: ['view.component.scss'],
})
export class ViewComponent implements OnInit {
  constructor(private http: HttpClient) {}

  dataSource: any;
  displayedColumns: string[] = ['title', 'detail_button'];
  details: any;

  ngOnInit() {
    this.http
      .get(
        'https://newsapi.org/v2/top-headlines?country=in&apiKey=' +
          environment.api_key
      )
      .subscribe((res: any) => {
        this.dataSource = new MatTableDataSource(res.articles);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(ele: any) {
    this.details = ele;
  }
}
