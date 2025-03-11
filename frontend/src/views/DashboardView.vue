<template>
    <v-row>
      <v-col cols="12" md="6">
        <v-card elevation="4" rounded="lg">
          <v-card-title>Power Status Overview</v-card-title>
          <v-card-text>
            <p>Power ON in {{ powerOnCount }} areas</p>
            <p>Power OFF in {{ powerOffCount }} areas</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card elevation="4" rounded="lg">
          <v-card-title>Your Band</v-card-title>
          <v-card-text>
            <p v-if="selectedBand">{{ selectedBand }} - {{ bandDetails }}</p>
            <p v-else>Select a band in Band Info</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card elevation="4" rounded="lg">
          <v-card-title>Power Usage (Last 7 Days)</v-card-title>
          <v-card-text>
            <BarChart :chart-data="chartData" :options="chartOptions" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card elevation="4" rounded="lg">
          <v-card-title>Tip of the Day</v-card-title>
          <v-card-text>
            <v-icon color="primary">{{ randomTip.icon }}</v-icon>
            <h3>{{ randomTip.title }}</h3>
            <p>{{ randomTip.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
  
  const BarChart = Bar;
  
  const mockStatuses = [
    { isPowerOn: true },
    { isPowerOn: false },
    { isPowerOn: true },
  ];
  const powerOnCount = computed(() => mockStatuses.filter(s => s.isPowerOn).length);
  const powerOffCount = computed(() => mockStatuses.filter(s => !s.isPowerOn).length);
  
  const selectedBand = ref('Band A');
  const bandDetails = 'Cost: ₦66/kWh, 20+ hours daily supply.';
  
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
  ];
  const randomTip = computed(() => tips[Math.floor(Math.random() * tips.length)]);
  
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Power Usage (kWh)',
        backgroundColor: '#1976D2',
        data: [12, 19, 3, 5, 2, 3, 9],
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  </script>
  
  <style scoped>
  canvas {
    max-height: 300px;
  }
  </style>