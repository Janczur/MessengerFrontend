import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false,
    users: [],
    snackbar: {}
  },
  mutations: {
    SET_LOADING_STATUS(state, status){
      state.loading = status
    },
    SET_USERS(state, users){
      state.users = users
    },
    SET_SNACKBAR(state, snackbar){
      state.snackbar = snackbar
    }
  },
  actions: {
    fetchUsers(context){
      context.commit('SET_LOADING_STATUS', true)
      axios.get('users').then(response =>{
        context.commit('SET_LOADING_STATUS', false)
        context.commit('SET_USERS', response.data)
      }). catch(error=>{
        throw new Error(`API ${error}`);
      })
    },
    setSnackbar(context, snackbar) {
      snackbar.showing = true;
      snackbar.status = snackbar.status || 'success'
      context.commit('SET_SNACKBAR', snackbar)
    }
  },
  getters: {
    allUsers: state => {
      return state.users
    },
    loading: state => {
      return state.loading
    }
  },
  modules: {}
});
