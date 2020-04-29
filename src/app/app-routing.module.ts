import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { ServersComponent } from './servers/servers.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';

export const appRoutes: Routes = [
    // The path is what will come after the domain
    // In this case, it would be localhost:4200/users, localhost:4200 e localhost:4200/servers

    // Path  -  Action that will happen
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent },
    ] },
    { path: 'servers', canActivate: [AuthGuard], component: ServersComponent, children: [
        { path: ':id/edit', component: EditServerComponent },
        { path: ':id', component: ServerComponent },
      ]
    },
    { path: 'not-found', component: PageNotFoundComponent},
    // This rout must always be the last one
    { path: '**', redirectTo: '/not-found', pathMatch: 'full'},
  ];

@NgModule({
    imports: [
        // ForRoot allows us to register some routes to our main application
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule{

}
