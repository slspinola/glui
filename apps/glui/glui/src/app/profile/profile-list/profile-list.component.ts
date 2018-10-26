import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Observable } from 'rxjs';
import { Profile } from '../profile.model';
import {MatTableDataSource} from '@angular/material'


@Component({
  selector: 'glui-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'lastname', 'email', 'jobs', 'edit', 'delete'];
  dataSource: MatTableDataSource<Profile>;

  profileList: Observable<Profile[]>
  _showFilter = false;

  constructor(private profileService: ProfileService) { 
    profileService.getProfiles().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    });
    //console.log(this.profileList);
   }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showFilter(): void{
    this._showFilter = !this._showFilter;
  }

  deleteProfile(profileId: string): void{
    this.profileService.deleteProfile(profileId);
  }

}
