import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ServersService } from '../Services/servers.service';
import { Injectable } from '@angular/core';

interface Server {
    id: number;
    name: string;
    status: string;
}

@Injectable()

                            // Definition of what this resolve will give us in the end
export class ServerResolver implements Resolve<Server>{

    constructor(private serversService: ServersService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> |
            Promise<Server> | Server {

        return this.serversService.getServer(+route.params.id);

    }
}
