<template>
  <div class="location-input">
    <label for="addressInput">Localización</label>
    <div>
      <div class="erase-text-btn" @click.prevent="removeAddressInputValue">
        <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 512 512">
          <path
            d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
          />
        </svg>
      </div>
      <input
        id="addressInput"
        ref="addressInputRef"
        type="text"
        name="addressInput"
        placeholder="Ingresa una dirección"
      />
    </div>
  </div>
  <div>
    <p class="error-message mt-2">{{ errorMessage }}</p>
    <p style="margin-top: 1rem">o también podrías</p>
    <button
      class="rounded mb-4"
      style="width: 100%"
      type="button"
      @click.prevent="getCurrentLocation()"
    >
      Usar mi ubicación actual
    </button>
  </div>
  <!-- <slot :user-location="locationInput" /> -->
  <div ref="mapDiv" style="width: 100%; height: 500px"></div>
</template>

<script>
/* eslint-disable no-undef */
import { ref, onMounted, watch } from "vue";
import { Loader } from "@googlemaps/js-api-loader";
import { useGeolocation } from "@/includes/useGeolocation";
import axios from "axios";

export default {
  name: "MapComponent",
  emits: ["pet-location", "remove-address-value"],

  setup(props, { emit }) {
    const mapDiv = ref(null);
    const addressInputRef = ref(null);

    let map = null;
    let marker = null;
    let autocomplete = null;
    let geocoder = null;

    let errorMessage = ref(null);

    const loader = new Loader({
      apiKey: "AIzaSyDb3CfMKaLCBz4RqDszlWHRfYq4yFhA5xo",
      version: "weekly",
    });
    //Mexico City coords - default
    const coordsPos = ref({
      lat: 19.432605,
      lng: -99.133045,
    });
    // Options to display the map
    const mapOptions = {
      center: coordsPos.value,
      zoom: 14,
      mapId: "map_id",
    };
    const mapMarkerOptions = {
      position: coordsPos.value,
      title: "Mi ubicacion",
    };
    const autocompleteOptions = {
      fields: ["formatted_address", "geometry", "name"],
      strictBounds: false,
      componentRestrictions: { country: "" },
    };

    // When user clicks and accepts to get their current location
    async function getCurrentLocation() {
      try {
        const coordsFunc = await useGeolocation();
        coordsPos.value = coordsFunc;

        geocoder = new google.maps.Geocoder();

        geocoder.geocode({ location: coordsFunc }, function (results, status) {
          if (status === "OK") {
            if (results[0]) {
              emit("pet-location", { sucess: true, data: results[0].formatted_address });
            } else {
              emit("pet-location", {
                sucess: false,
                data: "No se encontró resultados con estas coordenadas.",
              });
            }
          } else {
            emit("pet-location", { sucess: false, data: "Hubo un error, intenta mas tarde." });
          }
        });
      } catch (e) {
        errorMessage.value = e.error;
      }
    }

    // When user's click to delete the input text
    function removeAddressInputValue() {
      emit("remove-address-value", { sucess: true, data: "" });
    }

    watch(coordsPos, async (newPosition) => {
      // Set new Position
      marker.setPosition(newPosition);
      // Set map zoom level
      map.setZoom(17);
      // Checks if map & marker exist
      if (map && marker) {
        // Centers the map to the user's location
        map.setCenter(newPosition);
        // To add the marker to the map, call setMap();
        marker.setVisible(true);
        marker.setMap(map);
      }
    });

    onMounted(async () => {
      try {
        const response = await axios(`http://ip-api.com/json`);
        autocompleteOptions.componentRestrictions.country = response.data.countryCode;
      } catch (error) {
        console.error("Error fetching country:", error);
      }

      await loader.load();
      // eslint-disable-next-line no-unused-vars
      const { Autocomplete } = await google.maps.importLibrary("places");

      // Creating the map with the given options and default location
      map = new google.maps.Map(mapDiv.value, mapOptions);
      // Creating the marker waiting for the user's position
      marker = new google.maps.Marker(mapMarkerOptions);
      // Creating autocomplete element so user can input location
      autocomplete = new google.maps.places.Autocomplete(
        addressInputRef.value,
        autocompleteOptions,
      );

      autocomplete.addListener("place_changed", async () => {
        const place = await autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location || addressInputRef.value.value === "") {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          errorMessage.value = "No has ingresado una ubicación válida para buscar.";
          marker.setVisible(false);
          return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(17);
        }
        coordsPos.value = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };

        // Sends the user's location to the parent component so it can be send to the server
        emit("pet-location", { sucess: true, data: place.formatted_address });

        marker.setVisible(true);
      });
    });
    return {
      getCurrentLocation,
      removeAddressInputValue,
      coordsPos,
      mapDiv,
      addressInputRef,
      errorMessage,
    };
  },
};
</script>

<style lang="scss" scoped>
.location-container {
  margin-top: 2rem;
  padding: 2rem 0;
  border-top: 2px solid #212121;
  .location-input {
    text-align: left;
    margin: 5px 0;
    width: 100%;
    position: relative;

    label {
      margin-bottom: 5px;
      font-weight: 600;
    }
    input {
      display: block;
      width: 100%;
      padding: 10px;
      padding-right: 35px;
      border: 1px solid #545454;
      border-radius: 5px;
      background-color: transparent;
      resize: none;
      color: #212121;
      &:focus {
        outline: 1px solid #212121;
      }
    }
    .erase-text-btn {
      position: absolute;
      right: 10px;
      top: 36px;
      width: 20px;
      svg:hover {
        cursor: pointer;
        fill: #4b4b4b;
      }
    }
  }
  .lastSeenDesc {
    margin-top: 2rem;
    text-align: left;
    label {
      margin-bottom: 15px;
      font-weight: 600;
    }
    textarea {
      display: block;
      width: 100%;
      padding: 10px;
      border: 1px solid #545454;
      border-radius: 5px;
      background-color: transparent;
      height: 200px;
      resize: none;
      &:focus {
        outline: 1px solid #212121;
      }
    }
  }
}
</style>
