<script setup lang="ts">
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { onMounted, ref } from "vue";

const map = ref<OlMap | null>(null);
const VIEW = new View({
  center: [117.25620141667574, -0.31222948067971146],
  zoom: 5,
  projection: "EPSG:4326",
});

const BASEMAP = new TileLayer({
  source: new OSM(),
});

onMounted(async () => {
  map.value = new OlMap({
    target: "map",
    layers: [BASEMAP],
    view: VIEW,
  });
});
</script>

<template>
  <div id="map" class="map"></div>
</template>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.ol-attribution {
  display: none !important;
}
</style>
