import { enableProdMode, ViewEncapsulation } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { preloaderFinished } from '@delon/theme';
preloaderFinished();

if (environment.production) {
  enableProdMode();
}

// 热替换
declare var module: any;

if (module.hot) {
  module.hot.accept();
}

const bootstrap = () => {
  return platformBrowserDynamic().bootstrapModule(AppModule, {
    defaultEncapsulation: ViewEncapsulation.Emulated,
    preserveWhitespaces: false,
  });
};

bootstrap().then(() => {
  if ((<any>window).appBootstrap) {
    (<any>window).appBootstrap();
  }
});
