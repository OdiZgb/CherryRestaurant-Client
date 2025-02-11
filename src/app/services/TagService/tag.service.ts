// src/app/services/tag.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TagDTO } from 'src/app/DTOs/TagDTO';
import { TagItemDTO } from 'src/app/DTOs/TagItemDTO';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiURL ='https://localhost:7260/tag';  // Update with your backend URL

  constructor(private http: HttpClient) {}

  getAllTags(): Observable<TagDTO[]> {
    return this.http.get<TagDTO[]>(`${this.apiURL}/getAllTags`);
  }
  getAllTagsByItemId(ItemId: number): Observable<TagItemDTO[]> {
    console.log(`Fetching tags for ItemId: ${ItemId}`);
    return this.http.get<TagItemDTO[]>(`${this.apiURL}/getAllTagsByItemId/${ItemId}`);
  }
  
  addTag(tag: TagDTO): Observable<TagDTO> {
    return this.http.post<TagDTO>(`${this.apiURL}/addTag`, tag);
  }
}
