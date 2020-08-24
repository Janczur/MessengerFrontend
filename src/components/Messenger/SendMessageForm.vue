<template>
  <v-card>
    <v-card-title>
      Wiadomość
    </v-card-title>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-textarea
              v-model="message"
              :rules="messageRules"
              :counter="255"
              label="Treść wiadomości"
              required
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submit"
            >
              Wyślij wiadomość
            </v-btn>
            <v-progress-linear
              class="mt-3"
              v-show="progress"
              :height="5"
              background-color="transparent"
              indeterminate
              light
              rounded
            ></v-progress-linear>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import axios from "@/axios";
export default {
  name: "SendMessageForm",
  props: ["selectedUsers"],
  data: () => ({
    valid: false,
    progress: false,
    message: "",
    messageRules: [
      v => !!v || "Treść wiadomości jest wymagana",
      v => v.length <= 255 || "Nazwa musi mieć mniej niż 255 znaków"
    ]
  }),
  methods: {
    submit() {
      if (Object.keys(this.selectedUsers).length === 0) {
        this.$store.dispatch("setSnackbar", {
          text:
            "Wybierz przynajmniej jednego użytkownika, do którego chcesz wysłać wiadomość",
          status: "error"
        });
        return;
      }
      this.progress = true;
      let userEmails = this.selectedUsers.map(({ email }) => email);
      axios
        .post("send/message", {
          message: this.message,
          userEmails: userEmails
        })
        .then(response => {
          this.$store.dispatch("setSnackbar", { text: response.data });
          this.progress = false;
        })
        .catch(error => {
          this.$store.dispatch("setSnackbar", {
            text: error.response.data,
            status: "error"
          });
          this.progress = false;
        });
    }
  }
};
</script>
