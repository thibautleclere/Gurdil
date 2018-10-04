import { Component, Input } from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { Beer } from '../../services/beer';
import {Gurdil} from "../../services/gurdil";


@Component({
  selector: 'addingbeers',
  templateUrl: 'addingbeers.html',
  styles: ['addingbeers.scss']
})
export class AddingbeersComponent {

  @Input() public nain: NainInterface;

  public beers: number = 0;

  constructor(
      public beerService: Beer,
      public gurdilService: Gurdil
  ) {}


  public addBeer() {
    this.beers++;
    this.beerService.beerAddedToDwarf(this.beers, this.nain);
  }

  public rmBeer() {
    if (this.beers > 0) {
      this.beers--;
      this.beerService.beerAddedToDwarf(this.beers, this.nain);
    }
  }

  public deletePlayer() {
    this.gurdilService.deleteToGurdil(this.nain);
  }

}
