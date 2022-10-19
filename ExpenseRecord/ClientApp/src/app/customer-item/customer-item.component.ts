import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../Models/customer';
import { CustomerServices } from '../Services/customer.service';

@Component({
  selector: 'app-customer-item',
  templateUrl: './customer-item.component.html',
  styleUrls: ['./customer-item.component.scss']
})
export class CustomerItemComponent implements OnInit {
  item!: ICustomer;
  constructor(public customerService: CustomerServices,
              private router: Router,
              private route: ActivatedRoute) {
    this.item = {
      Id: 'new',
      Date: new Date().toISOString(),
      Description: '',
      Type: '',
      Amount: 0
    };
  }

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('itemId');
    console.log("item page start!!!!");
    if (id && id !== 'new') {
      this.loadData(id);
    }
  }
  private loadData(id: string): void {
    this.customerService.getOne(id).subscribe({
      next: (response) => {
        this.item = response;
      },
      error: () => {
        console.error('Failed to load item');
      }
    });
  }
  async navToList(): Promise<boolean> {
    return this.router.navigate(['api/v1/customers'], {
      relativeTo: this.route.parent
    });
  }
  isNewItem(): boolean {
    return this.item.Id === 'new';
  }
  save(): void {
    this.customerService.createOne(this.item).subscribe({
      next: () => this.navToList(),
      error: () => console.error('Failed to create item')
    });
  }
  delete(): void {
    const ok = confirm(`Delete this item?`);
    if (ok) {
      if (!this.isNewItem()) {
        this.customerService.deleteOne(this.item.Id).subscribe(() => {
          this.navToList();
        });
      } else {
        this.navToList();
      }
    }
  }
  

}
