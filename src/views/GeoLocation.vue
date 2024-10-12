<template>
  <div class="map-container">
    <div class="place-name-display">
      <h3 v-if="placeName">{{ placeName }}</h3>
    </div>

    <div id="map" class="map-square"></div>

    <div class="hospital-list">
      <h3>Hospitals</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="hospital in hospitals" :key="hospital.name">
            <td @click="showHospitalInfo(hospital)" class="clickable">{{ hospital.name }}</td>
            <td>{{ hospital.address }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import axios from 'axios';

export default {
  data() {
    return {
      map: null,
      placeName: '', 
      hospitals: [
        { name: 'Royal Melbourne Hospital', address: '300 Grattan St, Parkville VIC 3050' },
        { name: 'St Vincent’s Hospital', address: '41 Victoria Parade, Fitzroy VIC 3065' },
        { name: 'The Alfred Hospital', address: '55 Commercial Rd, Melbourne VIC 3004' },
        { name: 'Austin Hospital', address: '145 Studley Rd, Heidelberg VIC 3084' },
        { name: 'Monash Medical Centre', address: '246 Clayton Rd, Clayton VIC 3168' },
      ]
    };
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1Ijoicm9veWZ1eHVhbiIsImEiOiJjbTIzNms5dmQwMmx2MmxvZ21lajRmano0In0.sDqSOOqCachhIO5DEwyCLg'; 
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [144.9631, -37.8136], 
        zoom: 12,
      });

      this.map.on('click', (e) => {
        const lngLat = e.lngLat;
        this.getPlaceName(lngLat.lng, lngLat.lat);
      });
    },

    async getPlaceName(lng, lat) {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=pk.eyJ1Ijoicm9veWZ1eHVhbiIsImEiOiJjbTIzNms5dmQwMmx2MmxvZ21lajRmano0In0.sDqSOOqCachhIO5DEwyCLg`;

      try {
        const response = await axios.get(url);
        this.placeName = response.data.features[0]?.place_name || 'Unknown place';
      } catch (error) {
        console.error('Error fetching place name:', error);
      }
    },

    showHospitalInfo(hospital) {
      this.placeName = `${hospital.name}, ${hospital.address}`;
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style scoped>
.map-container {
  display: grid;
  grid-template-columns: 1fr 30%;
  gap: 20px;
  padding: 20px;
}

.place-name-display {
  grid-column: 1 / -1;
  margin-bottom: 10px;
  text-align: center;
}

.map-square {
  width: 100%;
  height: 50vh;
  border: 1px solid #ccc;
  background-color: white;
}

.hospital-list {
  width: 100%;
}

.hospital-list table {
  width: 100%;
  border-collapse: collapse;
}

.hospital-list th, .hospital-list td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ccc;
}

.hospital-list td.clickable {
  cursor: pointer;
  color: blue;
}

.hospital-list td.clickable:hover {
  text-decoration: underline;
}
</style>
