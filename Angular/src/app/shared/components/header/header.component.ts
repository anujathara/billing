import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { TaskService } from '../../broadcast-service/task.service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor(private taskService: TaskService, private router : Router) {}

  ngOnInit() {
    
  }

  createTask(title: string, path: string) {
     this.taskService.createTask(title, path);
  }
}
