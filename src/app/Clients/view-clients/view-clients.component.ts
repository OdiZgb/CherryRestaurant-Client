import { Component, OnInit } from '@angular/core';
import { ClientDTO } from 'src/app/DTOs/ClientDTO';
import { ClientService } from 'src/app/services/Clients/client.service';

@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit {
  clients: ClientDTO[] = [];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getAllClients$().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: (error) => {
        console.error('Error retrieving clients:', error);
      }
    });
  }
}
