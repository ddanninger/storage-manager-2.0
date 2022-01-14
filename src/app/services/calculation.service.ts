import { Injectable } from '@angular/core';
import { combineLatest, Observable, ReplaySubject, Subject, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Container, Good, Solution } from '../classes';
import { CALCULATION_ERROR } from '../components/main/calculation/calculation-component.classes';
import { generateGuid } from '../globals';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor(private _dataService: DataService) { }

  allInOneRow(description: string = 'All In One Row'): Observable<Solution> {
    return this._dataService.containerValid$.pipe(
      switchMap((valid: boolean) => {
        if(!valid) return throwError(CALCULATION_ERROR.CONTAINER_NOT_READY);
        let subject = new ReplaySubject<Solution>(1);
        combineLatest([this._dataService.orders$, this._dataService.containerHeight$, this._dataService.containerWidth$, this._dataService.groups$])
          .pipe(take(1))
          .subscribe(([orders, height, width, groups]) => {
            let solution = new Solution(generateGuid(), description);
            solution._Container = new Container(height, width, 0);
            let currentPosition = { x: 0, y: 0, z: 0 };
            let sequenceNumber = 0;
            for (let order of orders) {
              for (let i = 0; i < order.quantity; i++) {
                let good = new Good(currentPosition.x, currentPosition.y, currentPosition.z, sequenceNumber, order.description);
                good.setOrderDimensions(order);
                solution._Container._Goods.push(good);
                sequenceNumber++;
                currentPosition.z += order.length;
                solution._Container._Length += order.length;
              }
            }
            solution._Groups = groups;
            this._dataService.setCurrentSolution(solution);
            subject.next(solution);
            subject.complete();
          });
        return subject.asObservable();
      })
    );
  }
}
