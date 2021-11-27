import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostForUpdate } from '../models/posts/post-for-update.model';
import { Post } from '../models/posts/post.model';
import { PostsService } from '../services/posts.service';
import { environment } from './../../environments/environment';
import { PostForCreation } from './../models/posts/post-for-creation.model';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  post: Post | undefined;
  selectedTags: string[] = [];
  allTags: string[] = [];

  postForm: FormGroup = this.formBuilder.group({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    summary: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    content: new FormControl('', [Validators.required]),
    tag: new FormControl(''),
    isDraft: new FormControl(false, [Validators.required])
  });

  isSubmitted = false;
  isLoading = true;
  postThumbnail: File | undefined;
  postThumbnailUrl = '';
  isNew = false;

  public editorConfig = {
    height: 500,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
  alignleft aligncenter alignright alignjustify | \
  bullist numlist outdent indent | removeformat | help',
    paste_data_images: true
  };

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService) {

  }

  async ngOnInit(): Promise<void> {

    console.log('EditPostComponent.ngOnInit');

    this.allTags = await this.postsService.getAllTags();

    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '', 10);

    if (isNaN(id)) {
      this.isLoading = false;
      this.isNew = true;
      this.cleanPostForm();
    } else {
      await this.loadPost(id);
    }
  }

  selectEvent(item: string) {
    this.AddTag(item);
  }

  onChangeSearch(value: string) {
    this.tag?.setValue(value.replace(/[^a-zA-Z0-9\-]/g, ''));
  }

  onKeyDownEvent(event: any) {
    event.stopPropagation();
    this.AddTag(this.tag?.value);
  }

  removeTag(tag: string): void {
    const index = this.selectedTags.findIndex(t => t === tag);

    this.selectedTags.splice(index, 1);
  }

  onImageChanged(event: any) {
    if (event.target.files.length === 0) {
      return;
    }

    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (loadEvent: any) => {
      this.postThumbnail = file;
      this.postThumbnailUrl = loadEvent.target.result;

    });

    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.postThumbnail = undefined;
    this.postThumbnailUrl = environment.defaultPostThumbnail;
  }

  async submitForm(): Promise<void> {
    this.isSubmitted = true;

    if (this.isNew) {
      await this.createPost();
    } else {
      await this.updatePost();
    }
  }

  async deletePost() {
    if (confirm('Careful, deletion is permanent. Are you sure you want to delete this post?')) {
      await this.postsService.delete(this.id?.value);
      this.toastrService.success('Post deleted', 'Bruner');
      this.router.navigateByUrl('/posts');
    }
  }

  private async createPost() {
    const postForCreation = this.getPostForCreation();
    const createdPost = await this.postsService.create(postForCreation);
    this.isSubmitted = false;
    this.cleanPostForm();
    this.toastrService.success('Post created', 'Bruner');
    this.router.navigate(['blog', 'post', createdPost.slug]);
  }

  private async updatePost() {
    const postForUpdate = this.getPostForUpdate();
    const updatedPost = await this.postsService.update(this.id?.value, postForUpdate);
    this.isSubmitted = false;
    this.cleanPostForm();
    this.toastrService.success('Post updated', 'Bruner');
    this.router.navigate(['blog', 'post', updatedPost.slug]);
  }

  private async loadPost(id: number) {
    const post = await this.postsService.getById(id);
    this.setFormFromPost(post);
    this.isLoading = false;
  }

  private cleanPostForm(): void {
    this.id?.setValue('');
    this.title?.setValue('');
    this.summary?.setValue('');
    this.content?.setValue('');
    this.selectedTags = [];
    this.isDraft?.setValue(false);
    this.postThumbnail = undefined;
    this.postThumbnailUrl = '';
  }

  private setFormFromPost(post: Post) {
    this.id?.setValue(post.id);
    this.title?.setValue(post.title);
    this.summary?.setValue(post.summary);
    this.content?.setValue(post.content);
    this.selectedTags = post.tags;
    this.isDraft?.setValue(post.isDraft);
    this.postThumbnailUrl = post.thumbnail ? environment.staticUrl + '\\' + post.thumbnail : environment.defaultPostThumbnail;
  }

  private getPostForCreation(): PostForCreation {
    const post = new PostForCreation();
    post.title = this.title?.value;
    post.summary = this.summary?.value;
    post.content = this.content?.value;
    post.tags = this.selectedTags;
    post.isDraft = this.isDraft?.value;
    post.thumbnail = this.postThumbnail;

    return post;
  }

  private getPostForUpdate(): PostForUpdate {
    const post = new PostForUpdate();
    post.title = this.title?.value;
    post.summary = this.summary?.value;
    post.content = this.content?.value;
    post.tags = this.selectedTags;
    post.isDraft = this.isDraft?.value;
    post.thumbnail = this.postThumbnail;

    return post;
  }

  private AddTag(item: string) {
    if (!this.selectedTags.some(t => t === item)) {
      this.selectedTags.push(item);
      this.tag?.setValue('');
    }
  }

  get id() {
    return this.postForm.get('id');
  }

  get title() {
    return this.postForm.get('title');
  }

  get summary() {
    return this.postForm.get('summary');
  }

  get content() {
    return this.postForm.get('content');
  }

  get tag() {
    return this.postForm.get('tag');
  }

  get isDraft() {
    return this.postForm.get('isDraft');
  }
}
