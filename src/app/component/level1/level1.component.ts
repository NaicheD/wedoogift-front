import {Component, Output} from '@angular/core';
import {CalculatorUiService} from "../../ui-service/calculator.ui-service";
import {CalculatorComponentValue} from "../../interface/calculatorComponentValue";

@Component({
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.scss']
})
export class Level1Component {

  @Output() amount: number;

  equalCombination: CalculatorComponentValue;
  ceilCombination: CalculatorComponentValue;
  floorCombination: CalculatorComponentValue;

  warningMessage: string;

  constructor(protected calculatorUiService: CalculatorUiService) {
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
    // TODO Faut-il relancer l'appel ? Ou peut-on se satisfaire des informations que nous avons déjà ?
    // => Ici en refaisant appel
    // if (combination && combination.value > 0) {
    //  this.cleanPage();
    //  this.getCardCombination(combination.value);
    // }
    // => Ici en utilisant les valeurs que nous avons déjà
    this.setValidCombination(combination);
  }

  /**
   * Get combination for a given amount
   */
  private getCardCombination(amount: number = this.amount || 0): void {
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
  protected setValidCombination(combination: CalculatorComponentValue): void {
    this.amount = combination ? combination.value : null;
    this.equalCombination = combination;
    this.ceilCombination = combination;
    this.floorCombination = combination;
  }

  /**
   * Clean the component
   */
  protected cleanComponent(): void {
    this.setValidCombination(null);
    this.warningMessage = '';
  }
}
