import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <app-customer-list></app-customer-list>
`
})
export class AppComponent {
  title = 'Record';
}
