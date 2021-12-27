import { Directive, HostListener } from '@angular/core';



@Directive({
  selector: '[clickNoRightClick]'
})

export class TestDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick() {
    // event.preventDefault();
    return false
  }

  constructor() { }

}