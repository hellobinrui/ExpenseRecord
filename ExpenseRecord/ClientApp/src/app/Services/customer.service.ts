import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { v4 as uuidv4 } from 'uuid';
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { ICustomer } from '../Models/customer';
@Injectable({
  providedIn: 'root',
})

export class CustomerServices implements OnInit {
  //fullList: ICustomer[] = [];
  displayList: ICustomer[] = [];
  ListUrl: string = "http://localhost:44425/api/v1/customers";
  constructor(private http: HttpClient) {
    this.getAll().subscribe((response: ICustomer[]) => {
      //this.fullList = response;
      this.displayList = response;
    });
  }

  ngOnInit(): void {
  }

  getAll(): Observable<ICustomer[]> {
    return this.http.get<ICustomer[]>(this.ListUrl);
  }
  getOne(id: string): Observable<ICustomer> {
    const itemUrl = `${this.ListUrl}/${id}`;
    return this.http.get<ICustomer>(itemUrl);
  }
  deleteOne(id: string): Observable<unknown> {
    const itemUrl = `${this.ListUrl}/${id}`;
    return this.http.delete(itemUrl);
  }
  createOne(body: ICustomer): Observable<string> {
    const item: ICustomer = {
      ...body,
      Id: uuidv4(),
      Date: new Date().toISOString()
    };
    return this.http.post(this.ListUrl, item, { responseType: 'text' });

  }   

}
