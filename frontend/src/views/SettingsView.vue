<template>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" rounded="xl" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold primary--text">Settings</v-card-title>
          <v-card-text>
            <v-switch v-model="darkMode" label="Dark Mode" color="primary" inset class="mb-4"></v-switch>
            <v-select v-model="mapStyle" :items="mapStyles" label="Map Style" outlined dense color="primary" class="mb-4"></v-select>
            <v-btn color="primary" block elevation="2" @click="saveSettings">Save Settings</v-btn>
            <v-expand-transition>
              <v-alert v-if="saved" type="success" class="mt-4" dense>Settings Saved!</v-alert>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTheme } from 'vuetify';
  
  const theme = useTheme();
  const darkMode = computed({
    get: () => theme.global.current.value.dark,
    set: (value) => (theme.global.name.value = value ? 'dark' : 'light'),
  });
  const mapStyle = ref('Default');
  const mapStyles = ['Default', 'Dark', 'Satellite'];
  const saved = ref(false);
  
  const saveSettings = () => {
    saved.value = true;
    setTimeout(() => (saved.value = false), 2000);
  };
  </script>