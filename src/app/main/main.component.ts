import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private billsUrl = "http://lims.dccouncil.us/api/v1/Legislation/LatestLaws/10"
  data: any = {};

  constructor(private http: Http) {

  }

  getData() {
    return this.http.get(this.billsUrl)
      .map((res: Response) => res.json());
  }

  ngOnInit() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    })

  }

}
