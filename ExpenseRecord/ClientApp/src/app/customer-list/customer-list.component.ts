import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../Models/customer';
import { CustomerServices } from '../Services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  constructor(public customerService: CustomerServices,
              private router: Router,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadData();
    //console.log("list works!!!");
  }
  async navToItem(item: ICustomer): Promise<boolean> {
    return this.router.navigate(['api/v1/customers', item.Id], {
      relativeTo: this.route.parent
    });
  }
  async navToCreateNew(): Promise<boolean> {
    return this.router.navigate(['api/v1/customers', 'new']);
  }
  private loadData(): void {

    this.customerService.getAll().subscribe((data) => {

      this.customerService.displayList = data;
      //this.customerService.fullList = data;

    });
  }

}
