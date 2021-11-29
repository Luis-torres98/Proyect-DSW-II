import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    constructor(private _navigate: Router) {}

    ngOnInit(): void {}

    navigate(path: any) {
        this._navigate.navigate(path);
    }
}
