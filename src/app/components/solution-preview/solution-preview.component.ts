import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { showAnimation } from 'src/app/animations';
import { Container, Solution } from 'src/app/classes';
import { GOODS_PROVIDER, GROUPS_PROVIDER } from 'src/app/interfaces';
import { DataService } from 'src/app/services/data.service';
import { SolutionPreviewComponentService } from './solution-preview-component.service';

@Component({
  selector: 'app-solution-preview',
  templateUrl: './solution-preview.component.html',
  styleUrls: ['./solution-preview.component.css'],
  providers: [
    { provide: GOODS_PROVIDER, useClass: SolutionPreviewComponentService },
    { provide: GROUPS_PROVIDER, useExisting: GOODS_PROVIDER }
  ],
  animations: [showAnimation]
})
export class SolutionPreviewComponent implements OnDestroy, OnInit {

  headline: string = null;
  calculated: string = null;
  algorithm: string = null;
  container: Container = null;

  private _subscriptions: Subscription[] = [];

  constructor(
    private _dataService: DataService
  ) { }

  downloadSolution = () => this._dataService.downloadCurrentSolution();

  ngOnInit(): void {
    this._subscriptions.push(...[
      this._dataService.currentSolution$.pipe(filter(x => x ? true : false)).subscribe((solution: Solution) => {
        this.headline = solution._Description;
        this.calculated = solution._Calculated;
        this.algorithm = solution._Algorithm;
        this.container = solution._Container;
      })
    ]);
  }

  ngOnDestroy(): void {
    for (let sub of this._subscriptions) sub.unsubscribe();
    this._subscriptions = [];
  }

}
