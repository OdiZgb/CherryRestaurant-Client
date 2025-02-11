import { Component, OnInit } from "@angular/core";
import { TagDTO } from "src/app/DTOs/TagDTO";
import { TagService } from "src/app/services/TagService/tag.service";

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  tags: TagDTO[] = [];
  newTag: TagDTO | any = { id: 0, title: '' };  // Initialize the tag object

  constructor(private tagService: TagService) {}

  ngOnInit(): void {
    this.getTags();
  }

  getTags(): void {
    this.tagService.getAllTags().subscribe((data: TagDTO[]) => {
      this.tags = data;
    });
  }

  onSubmit(): void {
    this.tagService.addTag(this.newTag).subscribe((tag: TagDTO) => {
      this.tags.push(tag);  // Add the new tag to the list
      this.newTag = { id: 0, title: '' };  // Reset the form
    });
  }
}
