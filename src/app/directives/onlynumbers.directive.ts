import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnlynumbers]'
})
export class OnlynumbersDirective {

  /**
   * Expresion regular para hacer match solo con digitos 
   */
  private regex: RegExp = new RegExp(/^[+]?\d+([.]\d+)?$/g);

  /**
   * Lista de teclas permitidas 
   */
  private specialKeys: Array<string> = [ 'Backspace', 'End', 'Home' ];

  /**
   * 
   * @ignore
   */
  constructor(private el: ElementRef) { }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
  if (this.specialKeys.indexOf(event.key) !== -1) {
  return;
  }
  let current: string = this.el.nativeElement.value;
  let next: string = current.concat(event.key);
  if (next && !String(next).match(this.regex)) {
  event.preventDefault();
  }
  }




}

