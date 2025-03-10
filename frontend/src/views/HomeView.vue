<template>
  <v-container>
    <h1>Powergrid App</h1>
    <v-card class="mb-4">
      <v-card-title>Power Status Map</v-card-title>
      <v-card-text>
        <div id="map" style="height: 400px;"></div>
      </v-card-text>
    </v-card>
    <v-card>
      <v-card-title>Power Management Tips</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(tip, index) in tips" :key="index">
            <v-list-item-title>{{ tip }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import L from 'leaflet';
import { defineComponent, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    let map = null;

    const mockStatuses = [
      { lat: 9.0820, lng: 8.6753, isPowerOn: true },  // Abuja
      { lat: 6.5244, lng: 3.3792, isPowerOn: false }, // Lagos
      { lat: 12.0000, lng: 8.5167, isPowerOn: true }, // Kano
    ];

    const tips = [
      'Use LED bulbs to save energy.',
      'Charge devices during power uptime.',
      'Unplug appliances during outages to avoid surges.',
    ];

    const updateMap = () => {
      mockStatuses.forEach((status) => {
        L.circle([status.lat, status.lng], {
          color: status.isPowerOn ? 'green' : 'red',
          fillColor: status.isPowerOn ? 'green' : 'red',
          fillOpacity: 0.5,
          radius: 200000,
        }).addTo(map);
      });
    };

    onMounted(() => {
      map = L.map('map').setView([9.0820, 8.6753], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);
      updateMap();
    });

    onUnmounted(() => {
      if (map) {
        map.remove();
      }
    });

    return { tips };
  },
});
</script>