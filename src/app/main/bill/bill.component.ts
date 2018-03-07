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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private legService: LegislationService
  ) { }

  ngOnInit() {



  }

}
