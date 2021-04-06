import {Injectable} from "@angular/core";
import {CalculatorHttpService} from "../http-service/calculator.http-service";
import {Observable} from "rxjs/Observable";
import {CalculatorAnswer} from "../interface/calculatorAnswer";

@Injectable()
export class CalculatorUiService {

  get shopId(): number {
    // TODO A voir comment vous voulez récup le shopId.
    return 5;
  }

  constructor(private calculatorHttpService: CalculatorHttpService) {
  }

  getCardForAmount(amount: number): Observable<CalculatorAnswer> {
    return new Observable(observer => {
      this.calculatorHttpService.getCardForAmount(amount, this.shopId).subscribe((calculatorAnswer) => {
        observer.next(calculatorAnswer);
        observer.complete();
      }, (error) => {
        observer.error(error);
      });
    });
  }

}
