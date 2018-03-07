import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { LegislationService } from '../../shared/services/legislation.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  private apiBaseUrl = "http://lims.dccouncil.us/api/v1/Legislation/Details/"
  billNum: string;
  data: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private legService: LegislationService
  ) { 
    this.billNum = route.snapshot.params.num;
    this.getBill();
  }

  ngOnInit() {
  }

  getBill() {
    this.getData().subscribe(data => {
      this.data = data;
      console.log(data);
    })
  }

  getData() {
    return this.http.get(this.apiBaseUrl + this.billNum)
      .map((res: Response) => res.json());
  }

}
