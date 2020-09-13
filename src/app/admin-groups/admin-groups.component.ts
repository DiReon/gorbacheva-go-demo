import { Component, OnInit } from '@angular/core';
import { GroupService } from '../group.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-groups',
  templateUrl: './admin-groups.component.html',
  styleUrls: ['./admin-groups.component.css']
})
export class AdminGroupsComponent implements OnInit {
  groups$: Observable<any>;
  constructor(
    private groupService: GroupService
  ) { 
    this.groups$ = this.groupService.getAll().valueChanges()
  }

  ngOnInit(): void {
  }

}
