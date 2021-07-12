import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Blog } from './blog.model';
// import { Ingredient } from '../shared/ingredient.model';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class BlogService {
  blogsChanged = new Subject<Blog[]>();
  show = new Subject<boolean>();

  // private blogs: Blog[] = [
  //   new Blog(
  //     'Biochemistry',
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur placeat ducimus soluta reiciendis ex corrupti illo? Fuga minus perferendis explicabo numquam aut, atque rem alias eos, aliquam tenetur illum voluptatem.',
  //     'Rahul',
  //     new Date()
  //   ),
  //   new Blog(
  //     'Microns',
  //     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur placeat ducimus soluta reiciendis ex corrupti illo? Fuga minus perferendis explicabo numquam aut, atque rem alias eos, aliquam tenetur illum voluptatem.',
  //     'Riteek',
  //     new Date()
  //   )
  // ];

  private blogs: Blog[] = []
  private filteredBlogs: Blog[] = []
  private writterBlogs: Blog[] = []
  private publicBlogs: Blog[] = []
  private showSearchs: boolean = false
  private showFilter: boolean = false

  constructor() {}

  setBlogs(Blogs: Blog[]) {
    this.blogs = Blogs;
    this.blogsChanged.next(this.blogs.slice());
  }

  getBlogsSize(){
    return this.blogs.length+1
  }

  getBlogs() {
    return this.blogs.slice();
  }

  getBlog(index: number) {
    return this.blogs[index];
  }

  getPublicBlogs() {
    this.publicBlogs = this.blogs.slice().filter(blog => {
      console.log(blog.view)
      return (blog.view === "Public")
    })
    return this.publicBlogs
  }

  getPublicBlog(index: number) {
    return this.publicBlogs[index];
  }

  getBlogswithId(userEmail: string){
    this.filteredBlogs = this.blogs.filter(blog => {
      return (blog.writter === (userEmail.substring(0, userEmail.indexOf("@")))) 
    })
    return this.filteredBlogs
  }

  getfilteredBlog(index: number) {
    console.log("inside filter array")
    return this.filteredBlogs[index];
  }

  getBlogswithWritter(user: string){  
    this.writterBlogs = this.blogs.filter(blog => {
      return (blog.writter === user && blog.view === "Public") 
    })
    return this.writterBlogs
  }

  getWritterBlog(index: number) {
    console.log("inside writter array")
    return this.writterBlogs[index];
  }

  addBlog(blog: Blog) {
    this.blogs.push(blog);
    this.blogsChanged.next(this.blogs.slice());
  }

  updateBlog(index:number, newBlog: Blog) {
    this.blogs[(newBlog.id-1)] = newBlog
    this.filteredBlogs[index] = newBlog
    this.blogsChanged.next(this.blogs.slice());
    this.blogsChanged.next(this.filteredBlogs.slice());
  }

  deleteBlog(index: number, deleteBlog: Blog) {
    this.filteredBlogs.splice(index,1)
    this.blogs.splice(deleteBlog.id-1, 1);
    this.blogsChanged.next(this.blogs.slice());
    this.blogsChanged.next(this.filteredBlogs.slice());
  }

  dateConversion(date: Date) {
    return date.toISOString().split('T')[0].toString()
  }

  displaySearch() {
    this.showSearchs = !this.showSearchs
    this.show.next(this.showSearchs)
  }

  getSearch() {
    console.log(this.showSearchs)
    return this.showSearchs
  }

  getFilter() {
    return this.showFilter
  }

  displayFilter() {
    this.showFilter = !this.showFilter
    this.show.next(this.showFilter)
  }
}
