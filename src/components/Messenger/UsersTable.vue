<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="6">
        <v-card>
          <v-card-title>
            Użytkownicy
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Szukaj"
                single-line
                hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
              v-model="selected"
              :headers="headers"
              :items="users"
              :single-select="singleSelect"
              :search="search"
              :loading="loading"
              loading-text="Ładowanie danych... Proszę czekać"
              show-select
              item-key="login"
          >
            <template v-slot:top>
              <v-switch v-model="singleSelect" label="pojedynczy wybór" class="pa-3"></v-switch>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <SendMessageForm :selectedUsers="selected"></SendMessageForm>
    </v-row>
  </v-container>
</template>

<script>
import SendMessageForm from "@/components/Messenger/SendMessageForm";
export default {
  name: "UsersTable",
  components: {
    SendMessageForm
  },

  data: () => ({
    search: '',
    singleSelect: false,
    selected: [],
    headers: [
      {text: 'Login', value: 'login'},
      {text: 'Email', value: 'email'},
      {text: 'Kanały kontaktu', value: 'contactChannels'}
    ]
  }),
  created() {
    this.$store.dispatch('fetchUsers')
  },
  computed: {
    users(){
      return this.$store.getters.allUsers
    },
    loading(){
      return this.$store.getters.loading
    }
  },
};
</script>
