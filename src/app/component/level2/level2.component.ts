import {Component} from '@angular/core';
import {Level1Component} from "../level1/level1.component";

@Component({
  templateUrl: './level2.component.html',
  styleUrls: ['./level2.component.scss']
})
export class Level2Component extends Level1Component {

  /**
   * Find the previous available amount.
   */
  previousAmount(amount: number = this.amount || 0): void {
    this.cleanComponent();
    this.calculatorUiService.getCardForAmount(amount - 1).subscribe((calculatorAnswer) => {
      let previousCombination = calculatorAnswer.equal || calculatorAnswer.floor;
      if (previousCombination && previousCombination.value) {
        this.amount = previousCombination.value;
        this.setValidCombination(previousCombination);
      } else {
        this.warningMessage = `Il n'y a pas de montant plus petit.`;
        this.setValidCombination(calculatorAnswer.ceil);
      }
    });
  }

  /**
   * Find the next available amount.
   */
  nextAmount(amount: number = this.amount || 0): void {
    this.cleanComponent();
    this.calculatorUiService.getCardForAmount(amount + 1).subscribe((calculatorAnswer) => {
      let nextCombination = calculatorAnswer.equal || calculatorAnswer.ceil;
      if (nextCombination && nextCombination.value) {
        this.setValidCombination(nextCombination);
      } else {
        this.warningMessage = `Il n'y a pas de montant plus grand.`;
        this.setValidCombination(calculatorAnswer.floor);
      }
    });
  }
}
