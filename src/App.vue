<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Messenger</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-snackbar
        v-model="snackbar.showing"
        :timeout="4000"
        :color="snackbar.status"
        top
      >
        <span>{{ snackbar.text }}</span>
        <v-btn text @click="snackbar.showing = false">Zamknij</v-btn>
      </v-snackbar>
      <UsersTable></UsersTable>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import UsersTable from "@/components/Messenger/UsersTable";
import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    UsersTable
  },

  computed: {
    ...mapState(["snackbar"])
  },

  props: {
    source: String
  },
  data: () => ({
    drawer: null
  })
};
</script>
