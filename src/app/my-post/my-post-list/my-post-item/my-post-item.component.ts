import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/home/blog.model';



@Component({
  selector: 'app-my-post-item',
  templateUrl: './my-post-item.component.html',
  styleUrls: ['./my-post-item.component.css']
})
export class MyPostItemComponent implements OnInit {
  @Input() blog: Blog;
  @Input() index: number;

  ngOnInit() {
  }
}
