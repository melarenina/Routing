import { Component, OnInit } from '@angular/core';
import { ServersService } from 'src/app/Services/servers.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.route.snapshot.params.id; // Every data coming from the url comes as a string. The plus makes it turn into a number

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        // This will change our user object, whenever the parameter change
        this.server = this.serversService.getServer(+params.id);
      }
    );

    this.server = this.serversService.getServer(id);
  }

}
