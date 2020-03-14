import { Controller } from "stimulus";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

export default class extends Controller {
  static targets = ["map"];

  connect() {
    mapboxgl.accessToken = this.mapTarget.dataset.mapboxApiKey;

    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v10"
    });

    const markers = JSON.parse(this.mapTarget.dataset.markers);
    this.addMarkersToMap(markers);
    this.fitMapToMarkers(markers);

    this.map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl
      })
    );
  }

  resize() {
    console.log("tada");
    this.map.resize();
  }

  fitMapToMarkers(markers) {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach(marker => bounds.extend([marker.lng, marker.lat]));
    this.map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
  }

  addMarkersToMap(markers) {
    markers.forEach(marker => {
      const popup = new mapboxgl.Popup().setHTML(marker.infoWindow);

      const element = document.createElement("div");
      element.className = "marker";
      element.style.backgroundImage = `url('${marker.image_url}')`;
      element.style.backgroundSize = "contain";
      element.style.width = "17px";
      element.style.height = "28px";

      new mapboxgl.Marker(element)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(this.map);
    });
  }
}
