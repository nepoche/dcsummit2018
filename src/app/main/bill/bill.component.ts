import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import { LegislationRequest } from '../../shared/legislationRequest';
import { LegislationService } from '../../shared/services/legislation.service';
import { NgModel } from '@angular/forms';
import { DatabaseService } from '../../shared/services/database.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  private apiBaseUrl = "http://lims.dccouncil.us/api/v1/Legislation/Details/"
  billNum: string;
  public contractAddress: Observable<any>;
  data: any = {};
  public request: LegislationRequest = new LegislationRequest();
  public fundsFor: number;
  public votesFor: number;
  public fundsAgainst: number;
  public votesAgainst: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http,
    private legService: LegislationService,
    private dbService: DatabaseService
  ) {
    this.billNum = route.snapshot.params.num;
    this.getBill();
    this.contractAddress = this.dbService.getContractAddress(this.billNum);
    this.contractAddress.subscribe(res => {
      console.log(res[0].contractAddress);
      this.legService.getContract(res[0].contractAddress)
          .then(result => {
            this.request = result;
          });
    })
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

  deposit() {
    return this.legService.depositFunds(this.request.contractAddress, this.request.etherAmount, this.request.userDecision);
  }

}
