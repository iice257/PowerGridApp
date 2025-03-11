<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="8">
      <v-card elevation="6" rounded="xl" class="pa-4">
        <v-tabs v-model="activeTab" color="primary" grow slider-color="primary">
          <v-tab value="map">Power Map</v-tab>
          <v-tab value="band">Band Info</v-tab>
          <v-tab value="tips">Tips</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" transition="slide-x-transition">
          <!-- Map Tab -->
          <v-window-item value="map">
            <v-card-text class="pt-4">
              <v-progress-circular v-if="loading" indeterminate color="primary" size="64" class="mx-auto"></v-progress-circular>
              <div v-else id="map" style="height: 500px; border-radius: 8px; position: relative;">
                <v-btn icon @click="centerOnUser" class="map-control">
                  <v-icon>mdi-crosshairs-gps</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-window-item>

          <!-- Band Info Tab -->
          <v-window-item value="band">
            <v-card-text class="pt-4">
              <v-row>
                <v-col v-for="band in bands" :key="band.name" cols="12" sm="4">
                  <v-card
                    @click="selectBand(band.name)"
                    :color="selectedBand === band.name ? 'primary' : 'white'"
                    class="pa-4"
                    elevation="2"
                    rounded="lg"
                  >
                    <v-card-title>{{ band.name }}</v-card-title>
                    <v-card-text>
                      <p>Cost: {{ band.cost }}</p>
                      <p>Supply: {{ band.supply }}</p>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-window-item>

          <!-- Tips Tab -->
          <v-window-item value="tips">
            <v-card-text class="pt-4">
              <v-carousel cycle hide-delimiters height="200">
                <v-carousel-item v-for="(tip, index) in tips" :key="index">
                  <v-card color="transparent" flat>
                    <v-card-text class="text-center">
                      <v-icon size="48" color="primary">{{ tip.icon }}</v-icon>
                      <h3 class="mt-2">{{ tip.title }}</h3>
                      <p>{{ tip.description }}</p>
                    </v-card-text>
                  </v-card>
                </v-carousel-item>
              </v-carousel>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const activeTab = ref('map');
    let map = null;
    const loading = ref(true);
    const selectedBand = ref(null);

    const mockStatuses = [
      {
        lat: 9.0820,
        lng: 8.6753,
        isPowerOn: true,
        name: 'Abuja',
        statusText: 'Power is ON',
        recentOutages: 'Last outage: 2 days ago, 4 hours',
      },
      {
        lat: 6.5244,
        lng: 3.3792,
        isPowerOn: false,
        name: 'Lagos',
        statusText: 'Power is OFF',
        recentOutages: 'Current outage: 3 hours',
      },
      {
        lat: 12.0000,
        lng: 8.5167,
        isPowerOn: true,
        name: 'Kano',
        statusText: 'Power is ON',
        recentOutages: 'Last outage: 1 week ago, 2 hours',
      },
    ];

    const bands = [
      { name: 'Band A', cost: '₦66/kWh', supply: '20+ hours daily' },
      { name: 'Band B', cost: '₦62/kWh', supply: '16-20 hours daily' },
      { name: 'Band C', cost: '₦58/kWh', supply: '12-16 hours daily' },
    ];

    const tips = [
      {
        title: 'Use LED Bulbs',
        description: 'Save energy with efficient lighting.',
        icon: 'mdi-lightbulb',
      },
      {
        title: 'Charge During Uptime',
        description: 'Charge devices when power is available.',
        icon: 'mdi-battery-charging',
      },
      {
        title: 'Unplug During Outages',
        description: 'Protect appliances from surges.',
        icon: 'mdi-power-plug-off',
      },
    ];

    const updateMap = () => {
      mockStatuses.forEach((status) => {
        const circle = L.circle([status.lat, status.lng], {
          color: status.isPowerOn ? 'green' : 'red',
          fillColor: status.isPowerOn ? 'green' : 'red',
          fillOpacity: 0.5,
          radius: 200000,
        }).addTo(map);

        circle.bindTooltip(status.name, { direction: 'top', offset: [0, -20] });
        circle.bindPopup(`
          <strong>${status.name}</strong><br>
          ${status.statusText}<br>
          <em>${status.recentOutages}</em>
        `);

        circle.on('mouseover', function () {
          this.setStyle({ fillOpacity: 0.8, radius: 220000 });
        });
        circle.on('mouseout', function () {
          this.setStyle({ fillOpacity: 0.5, radius: 200000 });
        });
      });

      const legend = L.control({ position: 'bottomright' });
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        div.innerHTML = `
          <strong>Legend</strong><br>
          <i style="background: green"></i> Power ON<br>
          <i style="background: red"></i> Power OFF
        `;
        return div;
      };
      legend.addTo(map);
    };

    const centerOnUser = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            map.setView([latitude, longitude], 13);
          },
          () => alert('Unable to retrieve location')
        );
      } else {
        alert('Geolocation not supported');
      }
    };

    onMounted(() => {
      setTimeout(() => {
        map = L.map('map').setView([9.0820, 8.6753], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);
        updateMap();

        const searchControl = new GeoSearchControl({
          provider: new OpenStreetMapProvider(),
          style: 'bar',
          showMarker: true,
          showPopup: false,
        });
        map.addControl(searchControl);

        loading.value = false;
      }, 1000);
    });

    onUnmounted(() => {
      if (map) map.remove();
    });

    const selectBand = (bandName) => {
      selectedBand.value = bandName;
    };

    return { activeTab, loading, bands, selectedBand, selectBand, tips, centerOnUser };
  },
});
</script>

<style scoped>
.map-control {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}
.legend i {
  width: 18px;
  height: 18px;
  float: left;
  margin-right: 8px;
  opacity: 0.7;
}
</style>