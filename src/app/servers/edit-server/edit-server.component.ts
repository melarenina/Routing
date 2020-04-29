import { Component, OnInit } from '@angular/core';
import { ServersService } from 'src/app/Services/servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deativate-guard.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;
  paramsSubscription: Subscription;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams.allowEdit === '1' ? true : false;
        console.log(this.allowEdit);
      }
    );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params.id;
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        // This will change our user object, whenever the parameter change
        this.server.id = params.id;
      }
    );
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    if (!this.allowEdit){
      return true;
    }

    // Se uma dessas propriedades mudou, e o changesSaved for falso
    // Pergunta pro usuário se ele quer descartar as alterações
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) &&
          !this.changesSaved){
            return confirm('Do you want to discard the changes?');
    }else{
      return true;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
