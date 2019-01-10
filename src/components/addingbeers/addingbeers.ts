import {Component, Input, OnInit} from '@angular/core';
import { NainInterface } from '../../models/nain.interface';
import { Beer } from '../../services/beer';
import {Gurdil} from "../../services/gurdil";


@Component({
  selector: 'addingbeers',
  templateUrl: 'addingbeers.html',
  styles: ['addingbeers.scss']
})
export class AddingbeersComponent implements OnInit {

  @Input() public nain: NainInterface;

  constructor(
      public beerService: Beer,
      public gurdilService: Gurdil
  ) {}

  public ngOnInit() {
    if (!this.nain.beers) {
      this.nain.beers = 0;
    }
  }

  public addBeer() {
    this.nain.beers++;
    this.beerService.beerAddedToDwarf(this.nain.beers, this.nain);
  }

  public rmBeer() {
    if (this.nain.beers > 0) {
      this.nain.beers--;
      this.beerService.beerAddedToDwarf(this.nain.beers, this.nain);
    }
  }

  public deletePlayer() {
    this.gurdilService.deleteToGurdil(this.nain);
  }

}
