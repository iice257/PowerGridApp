<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Powergrid App</v-toolbar-title>
      <v-spacer></v-spacer>
      <nav>
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 0 1rem;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>

<style>
@import 'leaflet/dist/leaflet.css';
</style>