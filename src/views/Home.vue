<script setup lang="ts">
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import { onMounted, ref } from "vue";
import VectorSource from "ol/source/Vector";
import { IPoint } from "../types/_point";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Circle, Fill, Stroke, Style } from "ol/style";

const map = ref<OlMap | null>(null);
const VIEW = new View({
  center: [117.25620141667574, -0.31222948067971146],
  zoom: 5,
  projection: "EPSG:4326",
});

const BASEMAP = new TileLayer({
  source: new OSM(),
});

/* TODO: plot point to map */
async function getPoint() {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const res = await response.json();

    res.data.forEach((item: IPoint) => {
      const marker = new Feature({
        geometry: new Point(item.coordinates),
      });

      const markerStyle = new Style({
        image: new Circle({
          radius: 6,
          fill: new Fill({ color: "#10eb97" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      });

      marker.setStyle(markerStyle);

      const vectorSource = new VectorSource({
        features: [marker],
      });

      const pointLayer = new VectorLayer({
        source: vectorSource,
      });

      map.value!.addLayer(pointLayer);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
onMounted(async () => {
  map.value = new OlMap({
    target: "map",
    layers: [BASEMAP],
    view: VIEW,
  });

  await getPoint();
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
