import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Post } from '../models/posts/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  latestPosts: Post[] | undefined;

  constructor(
    private titleService: Title,
    private postsService:PostsService) 
  {
    this.titleService.setTitle('Bruner | About me');
  }

async ngOnInit(): Promise<void> {
    var posts = await this.postsService.getAll();
    this.latestPosts = posts.slice(0, 3);
  }
}
