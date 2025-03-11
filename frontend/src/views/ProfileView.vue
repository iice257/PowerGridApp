<template>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" rounded="xl" class="pa-6">
          <v-card-title class="text-h5 font-weight-bold primary--text">Profile</v-card-title>
          <v-card-text>
            <v-text-field v-model="name" label="Name" outlined dense color="primary" class="mb-4"></v-text-field>
            <v-text-field v-model="location" label="Location" outlined dense color="primary" class="mb-4"></v-text-field>
            <v-btn color="primary" block elevation="2" @click="saveProfile">Save Profile</v-btn>
            <v-expand-transition>
              <v-alert v-if="saved" type="success" class="mt-4" dense>Profile Updated!</v-alert>
            </v-expand-transition>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const name = ref('');
  const location = ref('');
  const saved = ref(false);
  
  const saveProfile = () => {
    saved.value = true;
    setTimeout(() => (saved.value = false), 2000);
  };
  </script>