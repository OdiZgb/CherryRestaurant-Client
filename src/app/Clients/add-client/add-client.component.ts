import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientDTO } from 'src/app/DTOs/ClientDTO';
import { ClientService } from 'src/app/services/Clients/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.clientForm.valid) {
      const newClient: ClientDTO = this.clientForm.value;
      this.clientService.addClient(newClient).subscribe({
        next: (client) => {
          console.log('Client added successfully:', client);
          this.clientForm.reset();
        },
        error: (error) => {
          console.error('Error adding client:', error);
        }
      });
    }
  }
}
