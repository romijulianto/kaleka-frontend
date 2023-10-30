<script setup lang="ts">
import OlMap from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import { onMounted, ref } from "vue";
import VectorSource from "ol/source/Vector";
import { IPoint } from "../types/_point";
import { Feature, Overlay } from "ol";
import Point from "ol/geom/Point";
import { Circle, Fill, Stroke, Style } from "ol/style";
import { SimpleGeometry } from "ol/geom";
import { Coordinate } from "ol/coordinate";
import { _popup } from "../utils/_popup";

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
const pointLayer = ref();
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
          radius: 10,
          fill: new Fill({ color: "#10eb97" }),
          stroke: new Stroke({ color: "white", width: 2 }),
        }),
      });

      marker.setStyle(markerStyle);
      const vectorSource = new VectorSource({
        features: [marker],
      });

      pointLayer.value = new VectorLayer({
        source: vectorSource,
      });

      map.value!.addLayer(pointLayer.value);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

/* TODO: popup content */
const popup = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();
const closer = ref<HTMLDivElement>();

onMounted(async () => {
  map.value = new OlMap({
    target: "map",
    layers: [BASEMAP],
    view: VIEW,
  });

  const overlay = new Overlay({
    element: popup.value,
    autoPan: {
      animation: {
        duration: 250,
      },
    },
  });

  map.value.addOverlay(overlay);

  await getPoint();

  map.value.on("click", (event) => {
    const feature = event.map.getFeaturesAtPixel(event.pixel)[0];
    if (feature) {
      const geometry = feature.getGeometry();
      if (geometry instanceof SimpleGeometry) {
        const coordinate = geometry.getCoordinates() as Coordinate | undefined;
        content.value!.innerHTML = _popup;
        overlay.setPosition(coordinate);
      }
    }
  });

  closer.value!.onclick = function () {
    overlay.setPosition(undefined);
    closer.value!.blur();
    return false;
  };
});
</script>

<template>
  <div class="justify-items-center">
    <div id="map" class="lg:p-[60px] sm:p-[30px] md:p-[40px] p-[20px]">
      <div
        ref="popup"
        class="ol-popup absolute bg-white shadow-md p-4 rounded-lg border border-gray-300 right-2 items-center min-w-[150px]"
      >
        <a href="#" ref="closer" class="absolute right-2 ol-popup-closer top-1">
          ✖
        </a>
        <div ref="content"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#map {
  position: relative;
  width: 100vw;
  height: 65vh;
}
</style>
