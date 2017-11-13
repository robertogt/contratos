import { NgModule, InjectionToken } from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  ENDPOINT: string;
}

export const APP_DI_CONFIG: AppConfig = {  
  //ENDPOINT: 'http://10.10.97.148:7001'  
  ENDPOINT: 'http://10.10.96.155:7001'  
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }