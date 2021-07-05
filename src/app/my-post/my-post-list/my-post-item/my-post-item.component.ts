import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Blog } from 'src/app/home/blog.model';



@Component({
  selector: 'app-my-post-item',
  templateUrl: './my-post-item.component.html',
  styleUrls: ['./my-post-item.component.css'],
  animations: [
    trigger('myblog', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class MyPostItemComponent implements OnInit {
  @Input() blog: Blog;
  @Input() index: number;

  ngOnInit() {
  }
}
