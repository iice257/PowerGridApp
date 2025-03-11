<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-app-bar app color="primary" dark elevation="2">
      <v-toolbar-title class="font-weight-bold">Powergrid App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/" class="mx-2">Home</v-btn>
      <v-btn text to="/band-info" class="mx-2">Band Info</v-btn>
      <v-btn text to="/tips" class="mx-2">Tips</v-btn>
    </v-app-bar>

    <v-main class="grey lighten-4">
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>

<style>
@import 'leaflet/dist/leaflet.css';
</style>