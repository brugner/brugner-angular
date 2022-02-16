import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    private meta: Meta,
    private postsService: PostsService) {
    this.meta.addTags([
      { name: 'description', content: 'My resume with my skills and abilities.' },
      { name: 'author', content: 'Nery Brugnoni' },
      { name: 'keywords', content: 'Blog, Resume, Personal' }
    ]);

    this.titleService.setTitle('Brugner | About me');
  }

  async ngOnInit(): Promise<void> {
    var posts = await this.postsService.getAll();
    this.latestPosts = posts.slice(0, 3);
  }
}
