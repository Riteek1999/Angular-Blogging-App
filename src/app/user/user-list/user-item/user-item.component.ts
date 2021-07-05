import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/home/blog.model';



@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() blog: Blog;
  @Input() index: number;

  ngOnInit() {
  }
}
