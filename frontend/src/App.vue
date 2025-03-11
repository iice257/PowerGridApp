<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';

const drawer = ref(false);
const notifications = ref([
  { text: 'Power outage in Lagos', time: '2h ago' },
  { text: 'Power restored in Kano', time: '1d ago' },
]);
const theme = useTheme();
const darkMode = computed({
  get: () => theme.global.current.value.dark,
  set: (value) => (theme.global.name.value = value ? 'dark' : 'light'),
});
const fab = ref(false);

const onScroll = () => {
  fab.value = window.scrollY > 200;
};

const toTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <v-app v-scroll="onScroll">
    <!-- Toolbar -->
    <v-app-bar app color="primary" :dark="!darkMode" elevation="3">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="ml-2"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold text-uppercase">Powergrid App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item v-for="(notif, index) in notifications" :key="index">
            <v-list-item-title>{{ notif.text }}</v-list-item-title>
            <v-list-item-subtitle>{{ notif.time }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-switch v-model="darkMode" inset color="white" class="ml-4" hide-details></v-switch>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app temporary :color="darkMode ? 'grey darken-4' : 'white'">
      <v-list dense>
        <v-list-item to="/" @click="drawer = false">
          <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item to="/dashboard" @click="drawer = false">
          <v-list-item-icon><v-icon>mdi-view-dashboard</v-icon></v-list-item-icon>
          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item to="/profile" @click="drawer = false">
          <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>
        <v-list-item to="/settings" @click="drawer = false">
          <v-list-item-icon><v-icon>mdi-cog</v-icon></v-list-item-icon>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>
        <v-list-item to="/community" @click="drawer = false">
          <v-list-item-icon><v-icon>mdi-forum</v-icon></v-list-item-icon>
          <v-list-item-title>Community</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main :class="darkMode ? 'grey darken-4' : 'grey lighten-4'">
      <v-container fluid class="pa-6">
        <v-slide-y-transition mode="out-in">
          <RouterView />
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <!-- Back-to-Top Button -->
    <v-btn v-show="fab" fab dark fixed bottom right color="primary" @click="toTop">
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>

    <!-- Footer -->
    <v-footer :color="darkMode ? 'grey darken-3' : 'primary'" :dark="!darkMode">
      <v-row justify="center">
        <v-col class="text-center">
          <p>&copy; 2025 Powergrid App. All rights reserved.</p>
          <v-btn text to="/terms">Terms</v-btn>
          <v-btn text to="/privacy">Privacy</v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<style scoped>
.v-btn,
.v-list-item {
  transition: all 0.3s ease;
}
.v-btn:hover,
.v-list-item:hover {
  transform: scale(1.05);
}
</style>

<style>
@import 'leaflet/dist/leaflet.css';
@import 'leaflet-geosearch/dist/geosearch.css';
.v-btn {
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.v-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.v-card {
  transition: all 0.3s ease;
}
.v-card:hover {
  transform: scale(1.02);
}
.v-text-field--outlined .v-input__control {
  border-radius: 8px;
}
</style>