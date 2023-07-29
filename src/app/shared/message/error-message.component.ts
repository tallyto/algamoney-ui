import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-error-message',
  template: `
    <small class="p-error" *ngIf="hasError()">
      {{text}}
    </small>
  `,
  styles: []
})
export class ErrorMessageComponent {
  @Input()
  error: string;
  @Input()
  control: FormControl | any;
  @Input()
  text: string;

  public hasError(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
