import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { NainInterface } from '../../models/nain.interface';


@Component({
  selector: 'modal-parameter',
  templateUrl: 'modal-parameter.html'
})
export class ModalParameterComponent implements OnInit {

  public formUrl: FormGroup;
  public nain: NainInterface;

  public constructor(
      public viewCtrl: ViewController,
      public formBuilder: FormBuilder,
  ) {}


  public ngOnInit (): void {
      const controlsConfig = {
          annonces6:['', Validators.required],
          video: ['', Validators.required],
          kaamelott: ['']
      };
      this.formUrl = this.formBuilder.group(controlsConfig);
  }

  public close(): void {
    this.viewCtrl.dismiss();
  }

  public saveChanges(): void {
      if (this.formUrl.controls['annonces6'].valid && this.formUrl.controls['annonces6'].value) {

      }
      if (this.formUrl.controls['video'].valid && this.formUrl.controls['video'].value) {

      }
      if (this.formUrl.controls['kaamelott'].valid && this.formUrl.controls['kaamelott'].value) {

      }
  }
}
