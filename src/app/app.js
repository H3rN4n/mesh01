import angular from 'angular';
import Components from './components/components';
import services from './services/services';
import 'normalize.css';

import AppComponent from './app.component';
import dndLists from 'angular-drag-and-drop-lists';
import angularWebsql from './angular-websql';

angular
.module('app', [
  Components.name,
  services.name,
  'dndLists',
  'angular-websql'
])
.component('app', AppComponent);

angular.bootstrap(document.body, ['app'])
