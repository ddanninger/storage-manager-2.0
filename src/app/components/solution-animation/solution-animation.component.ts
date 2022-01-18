import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { VisualizerComponentService } from '../main/visualizer/visualizer-component-service';

@Component({
  selector: 'app-solution-animation',
  templateUrl: './solution-animation.component.html',
  styleUrls: ['./solution-animation.component.css']
})
export class SolutionAnimationComponent implements OnDestroy, OnInit {

  private _subscriptions: Subscription[] = [];

  constructor(
    public dataService: DataService,
    public visualizerComponentService: VisualizerComponentService
  ) { }

  ngOnDestroy(): void {
      for(let sub of this._subscriptions) sub.unsubscribe();
      this._subscriptions = [];
  }

  ngOnInit(): void {
  }

}
