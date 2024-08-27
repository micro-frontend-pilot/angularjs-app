import angular from 'angular'
import uirouter from 'angular-ui-router'

import proute from './pokemons/pokemons.routes.js'
import pokemonList from './pokemons/pokemon-list/pokemon-list.component'
import PokemonsService from './pokemons/pokemons.service'

import groute from './modules.general.routers.js';
import mfeExposeRoute from './mfe-expose/mfe-expose.router.js';
import mfeExposeComponent from './mfe-expose/mfe-expose.js';

export const grmod = angular.module('ngapp.generalRouter', [uirouter])
    .config(groute)
    .name

export const pokemon = angular.module('ngapp.pokemons', [uirouter])
    .config(proute)
    .component('pokemonList', pokemonList)
    .service('PokemonsService', PokemonsService)
    .name

export const mfeExpose = angular.module('ngapp.mfeExpose', [uirouter])
    .config(mfeExposeRoute)
    .component('mfeExpose', mfeExposeComponent)
    .name

