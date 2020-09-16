import Vue from 'vue';
import * as Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';

import { Store } from 'vuex';

import albums from './albums';
import albumsState from './albums/state';

import app from './app';
import appState from './app/state';


Vue.use(Vuex);

interface IStore {
  albums: albumsState,
  app: appState
}

export type StoreType = Store<IStore>;

const store: StoreType = createStore(
  new Module({
    modules: {
      albums,
      app
    }
  }),
  {
    strict: process.env.NODE_ENV !== 'production',
  }
)

export default store;
