import { Component, Input, OnInit } from '@angular/core';
import {NainInterface} from "../../models/nain.interface";


@Component({
  selector: 'gurdil-player',
  templateUrl: 'player.html'
})
export class PlayerComponent implements OnInit {

  @Input() public nain: NainInterface;

  constructor() {}

  public ngOnInit() {

  }

}
