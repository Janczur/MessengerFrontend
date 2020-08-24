<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <span :class="{ 'bounce animated': animated }">Użytkownicy</span>
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
              <v-switch
                v-model="singleSelect"
                label="pojedynczy wybór"
                class="pa-3"
              ></v-switch>
            </template>
            <template v-slot:item.contactChannels="{ item }">
              <v-chip :color="getColor(item.contactChannels)" dark>{{
                showContactChannel(item.contactChannels)
              }}</v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <SendMessageForm :selectedUsers="selected"></SendMessageForm>
      </v-col>
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
    search: "",
    singleSelect: false,
    selected: [],
    animated: false,
    headers: [
      { text: "Login", value: "login" },
      { text: "Email", value: "email" },
      { text: "Kanały kontaktu", value: "contactChannels" }
    ]
  }),
  created() {
    this.$store.dispatch("fetchUsers");
  },
  methods: {
    getColor(contactChannels) {
      if (contactChannels !== null) {
        return "green";
      }
    },
    showContactChannel(contactChannels) {
      if (contactChannels === null) {
        return "brak";
      }
      return contactChannels.replace(",", " + ");
    }
  },
  computed: {
    users() {
      return this.$store.getters.allUsers;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
