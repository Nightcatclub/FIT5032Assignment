<template>
  <div class="map-container">
    <div ref="mapContainer" class="map"></div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default {
  data() {
    return {
      map: null,
      userLocation: null,
      hospitals: [],
    };
  },
  async mounted() {

    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9veWZ1eHVhbiIsImEiOiJjbTIzNms5dmQwMmx2MmxvZ21lajRmano0In0.sDqSOOqCachhIO5DEwyCLg';

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        this.userLocation = [position.coords.longitude, position.coords.latitude];
        this.initializeMap(this.userLocation);
        await this.searchNearbyHospitals(this.userLocation);
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  },
  methods: {
    initializeMap(center) {
      this.map = new mapboxgl.Map({
        container: this.$refs.mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: center,
        zoom: 13,
      });

    },

    async searchNearbyHospitals(center) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${center[0]},${center[1]}&access_token=${mapboxgl.accessToken}`;
      const response = await axios.get(url);

      this.hospitals = response.data.features;
      this.displayHospitalsOnMap(this.hospitals);
    },
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 500px;
}
.map {
  height: 100%;
}
</style>
