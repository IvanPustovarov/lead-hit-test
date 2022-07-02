<template>
  <h1 class="header">LeadHit</h1>
  <form @submit.prevent>
    <input
      :class="{ invalid: !isValidId || isError }"
      class="input"
      maxlength="24"
      v-model="id"
      type="text"
    />
    <button
      @click="goToAbout"
      type="submit"
      :disabled="!isValidId"
      class="singin"
    >
      Sign In
    </button>
    <div v-if="isError || !isValidId" class="message-error">Invalid id</div>
  </form>
</template>

<script>
import axios from "axios";
const URL = "https://track-api.leadhit.io/client/test_auth";
const apiKey = "5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo";
export default {
  name: "AuthView",
  components: {},
  data() {
    return {
      id: "",
      isError: false,
    };
  },
  methods: {
    async goToAbout() {
      try {
        const response = await axios.get(`${URL}`, {
          headers: {
            "Api-Key": `${apiKey}`,
            "Leadhit-Site-Id": `${this.id}`,
          },
        });
        const isAuthorized = response.data.message === "ok";
        if (!isAuthorized) {
          throw new Error("Unauthorized");
        }
        localStorage.setItem("leadhit-site-id", "5f8475902b0be670555f1bb3");
        this.$router.push("/analitics");
      } catch (error) {
        this.isError = true;
      }
    },
  },
  computed: {
    isValidId() {
      return this.id.length > 23;
    },
    isAnswer() {
      return this.$store.state.answer;
    },
  },
};
</script>

<style scoped>
.input {
  width: 300px;
  height: 20px;
  font-size: 18px;
  border: none;
  border-bottom: 2px solid rgb(0, 0, 0);
  margin: 10px;
}

.input:focus {
  outline: none;
}

.singin {
  cursor: pointer;
  background-color: rgb(255, 255, 255);
  border: none;
  width: 100px;
  height: 50px;
  font-size: 18px;
}

.message-error {
  color: red;
  margin: 0 0 0 10px;
}

.invalid {
  border: none;
  border-bottom: 2px solid rgb(255, 0, 0);
}

.header {
  margin: 10px 0 0 10px;
}
</style>
