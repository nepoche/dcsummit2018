import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private billsUrl = "http://lims.dccouncil.us/api/v1/Legislation/LatestLaws/50"
  data: any = {};

  constructor(private http: Http) {
    this.getBills();
    this.getData();
  }

  getBills() {
    this.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    })
  }

  getData() {
    return this.http.get(this.billsUrl)
      .map((res: Response) => res.json());
  }

  ngOnInit() {
  }

}
