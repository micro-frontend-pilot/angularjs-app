import angular from 'angular'
import uirouter from 'angular-ui-router'

import LazyLoader from './modules/LazyLoader.js';
import routes from './app.routes'
import { pokemon, grmod } from './modules'

angular
  .module('ngapp', [uirouter, pokemon, grmod])
  .service('lazyLoader', LazyLoader)
  .config(routes)
