import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { NainInterface } from '../../models/nain.interface';


@Component({
  selector: 'gurdil-slideup',
  templateUrl: 'slideup.html',
  styles: ['slideup.scss']
})
export class SlideupComponent implements OnInit {

  @Input() public text: string;
  @Input() public icon: string;
  @Input() public element: string;
  @Input() public players: NainInterface[] = [];

  public toogle: boolean;

  public constructor() {}

  public ngOnInit() {
      this.toogle = false;
  }

  public slideUp() {
    this.toogle = !this.toogle;
  }

}
