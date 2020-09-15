import Vue from 'vue';
import * as Vuex from 'vuex';
import { createStore, Module } from 'vuex-smart-module';

import { Store } from 'vuex';

import albums from './albums';
import albumsState from './albums/state';


Vue.use(Vuex);

interface IStore {
  albums: albumsState
}

export type StoreType = Store<IStore>;

const store: StoreType = createStore(
  new Module({
    modules: {
      albums,
    }
  }),
  {
    strict: process.env.NODE_ENV !== 'production',
  }
)

export default store;
