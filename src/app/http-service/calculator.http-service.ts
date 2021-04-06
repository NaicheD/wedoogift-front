import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {Observable} from "rxjs";
import {ObservableInput} from "rxjs/Observable";
import {CalculatorAnswer} from "../interface/calculatorAnswer";

@Injectable()
export class CalculatorHttpService {

  constructor(private http: HttpClient) {
  }

  getCardForAmount(amount: number, shopId: number): Observable<CalculatorAnswer> {
    let path = `http://localhost:3000/shop/${shopId}/search-combination`;

    const params = new HttpParams().append('amount', amount.toString(10));
    return this.http.get(path, {params: params}).pipe(catchError(this.handleError));
  }

  private handleError(err: any, caught: Observable<any>): ObservableInput<any> {
    let errorMessage = 'An error happened';
    if (err instanceof HttpErrorResponse && err.status == 500 && err.error) {
      errorMessage = err.error.description || err.error.code || errorMessage;
    } else {
    }
    confirm(errorMessage);
    return new Observable();
  }
}
