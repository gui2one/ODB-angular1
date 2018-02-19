import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';

@NgModule({
    imports: [
        ServerModule,
        AppModule,
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppServerModule { }