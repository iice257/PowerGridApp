<template>
    <v-card class="mt-4">
      <v-card-title>Band Information</v-card-title>
      <v-card-text>
        <v-select
          v-model="selectedBand"
          :items="bands"
          label="Select Your Band"
          outlined
        ></v-select>
        <v-btn @click="showBandDetails" color="primary">Show Details</v-btn>
        <v-alert v-if="bandDetails" type="info" class="mt-4">
          {{ bandDetails }}
        </v-alert>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedBand: null,
        bands: ['Band A', 'Band B', 'Band C'],
        bandDetails: null,
      };
    },
    methods: {
      showBandDetails() {
        if (this.selectedBand) {
          this.bandDetails = `Details for ${this.selectedBand}: Cost and service expectations.`;
        } else {
          this.bandDetails = 'Please select a band.';
        }
      },
    },
  };
  </script>