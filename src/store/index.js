import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
Vue.use(Vuex);
let state = {


};
export default new Vuex.Store({
  state,actions,mutations,getters
})
