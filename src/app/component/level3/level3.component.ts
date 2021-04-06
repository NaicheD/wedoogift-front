import {Component, Output} from '@angular/core';
import {CalculatorComponentValue} from "../../interface/calculatorComponentValue";
import {CalculatorUiService} from "../../ui-service/calculator.ui-service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './level3.component.html',
  styleUrls: ['./level3.component.scss']
})
export class Level3Component {

  wedoogiftForm: FormGroup = new FormGroup({
    'amount': new FormControl(null, Validators.compose([
      Validators.required,
      Validators.min(0),
      Validators.max(99)
    ]))
  });

  @Output() get amount(): FormControl {
    return <FormControl>this.wedoogiftForm.get('amount');
  }

  equalCombination: CalculatorComponentValue;
  ceilCombination: CalculatorComponentValue;
  floorCombination: CalculatorComponentValue;

  warningMessage: string;

  constructor(private calculatorUiService: CalculatorUiService) {
  }

  /**
   * Get the combinations from the form input.
   */
  onSubmit(): void {
    this.getCardCombination();
  }

  /**
   * Set a specified combination
   */
  loadCombination(combination: CalculatorComponentValue): void {
    this.cleanComponent();
    this.setValidCombination(combination);
  }

  /**
   * Get previous amount
   */
  previousAmount(amount: number = this.amount.value || 0) {
    this.cleanComponent();
    this.calculatorUiService.getCardForAmount(amount - 1).subscribe((calculatorAnswer) => {
      let previousCombination = calculatorAnswer.equal || calculatorAnswer.floor;
      if (previousCombination && previousCombination.value) {
        this.amount.setValue(previousCombination.value);
        this.equalCombination = previousCombination;
      } else {
        this.warningMessage = `Il n'y a pas de montant plus petit.`;
        this.equalCombination = calculatorAnswer.ceil;
        this.amount.setValue(this.equalCombination ? this.equalCombination.value : this.amount.value);
      }
    });
  }

  /**
   * Get next amount
   */
  nextAmount(amount: number = this.amount.value || 0) {
    this.cleanComponent();
    this.calculatorUiService.getCardForAmount(amount + 1).subscribe((calculatorAnswer) => {
      let nextCombination = calculatorAnswer.equal || calculatorAnswer.ceil;
      if (nextCombination && nextCombination.value) {
        this.amount.setValue(nextCombination.value);
        this.equalCombination = nextCombination;
      } else {
        this.warningMessage = `Il n'y a pas de montant plus grand.`;
        this.equalCombination = calculatorAnswer.floor;
        this.amount.setValue(this.equalCombination ? this.equalCombination.value : this.amount);
      }
    });
  }

  /**
   * Get combination for a given amount
   */
  private getCardCombination(amount: number = this.amount.value || 0): void {
    this.calculatorUiService.getCardForAmount(amount).subscribe((calculatorAnswer) => {
      this.equalCombination = calculatorAnswer.equal;
      this.ceilCombination = calculatorAnswer.ceil;
      this.floorCombination = calculatorAnswer.floor;
      if (!this.equalCombination) {
        this.warningMessage = `Il n'y a pas de combinaison pour le montant ${this.amount}`;
      }
      this.checkLimit(calculatorAnswer);
    });
  }

  /**
   * Check if amount is out of limit.
   * If it is, set the closest combination.
   */
  private checkLimit(calculatorAnswer): void {
    if (!calculatorAnswer.equal) {
      if (!calculatorAnswer.ceil && calculatorAnswer.floor) {
        this.loadCombination(calculatorAnswer.floor);
        this.warningMessage = `Le montant maximum  est de ${this.amount}`;
      }
      if (calculatorAnswer.ceil && !calculatorAnswer.floor) {
        this.loadCombination(calculatorAnswer.ceil);
        this.warningMessage = `Le montant minimum est de ${this.amount}`;
      }
    }
  }

  /**
   * Set a combination as valid
   */
  private setValidCombination(combination: CalculatorComponentValue): void {
    this.amount.setValue(combination ? combination.value : null);
    this.equalCombination = combination;
    this.ceilCombination = combination;
    this.floorCombination = combination;
  }

  /**
   * Clean the component
   */
  private cleanComponent(): void {
    this.setValidCombination(null);
    this.warningMessage = '';
  }

}
