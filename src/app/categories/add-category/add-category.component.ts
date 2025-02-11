import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoryDTO } from 'src/app/DTOs/CategoryDTO';
import { CategoryPropertyDTO } from 'src/app/DTOs/CategoryPropertyDTO';
import { CategoryService } from 'src/app/services/CategoryService/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  myForm!: FormGroup;
  categoryFeatureControllerCounter = 0;

  constructor(private formBuilder: FormBuilder, private categoryService: CategoryService, private messageService: MessageService) {
  }

  ngOnInit(): void {
     this.myForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(1)]],
      categoryDescription: ['', [Validators.required, Validators.minLength(1)]],
      controls: this.formBuilder.array([])
    });
  }
 
  addControl() {
    let controls = this.myForm?.get('controls') as FormArray;
    const controlName = 'categoryFeatureController' + this.categoryFeatureControllerCounter;
    this.myForm.addControl(controlName, this.formBuilder.control('', Validators.required));
    const newControl = this.myForm.get(controlName);
    if (newControl) {
      controls.push(newControl);
    }
    this.categoryFeatureControllerCounter = this.categoryFeatureControllerCounter + 1;
  }

  get controls(): FormArray {
    return this.myForm.get('controls') as FormArray;
  }

  onSubmit(): void {
     if (this.myForm.valid) {
      const categoryNameValue = this.myForm.get('categoryName')?.value;
      const categoryDescriptionValue = this.myForm.get('categoryDescription')?.value;
  
      let categoryPropertiesDTO: CategoryPropertyDTO[] = [];
  
      this.controls.value.forEach((categoryPropertyName: string) => {
        let categoryPropertyDTO: CategoryPropertyDTO = {
          id: null,
          categoryId: null,
          name: categoryPropertyName,
          categoryDTO: null
        };
  
        categoryPropertiesDTO.push(categoryPropertyDTO);
      });
  
      let categoryToAdd: CategoryDTO = {
        id: 0,
        name: categoryNameValue,
        description: categoryDescriptionValue,
        categoryPropertiesDTO: categoryPropertiesDTO,
        ImageURL: null
      };
      this.categoryService.addCategory(categoryToAdd).subscribe(
        x=>{
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category '+x.name+' has been added'});
        }
        );
    } else {
    }
  }
}
