<template>
  <main>
    <article>
      <h1>Registra una mascota perdida</h1>
      <vee-form
        class="lost-pet-form"
        :validation-schema="lostPetRegistrationSchema"
        @submit="registerLostPet"
        @keydown.enter="$event.preventDefault()"
        @invalid-submit="onInvalidSubmit"
      >
        <div class="user-info">
          <div class="user-info-photo">
            <!-- <img :src="user.photo" alt="User image" /> -->
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
              <path
                d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
              />
            </svg>
          </div>
          <p>{{ user.name }}</p>
        </div>
        <DropzoneImage ref="DropzoneImageRef" @image-upload-change="imageUploadChange" />
        <p v-if="!minImagesUploaded" class="error-message text-left">
          *Es necesario añadir una foto.
        </p>
        <div class="inputs-main-container">
          <h1>Datos de la mascota</h1>
          <div class="inputs-container">
            <div class="input-item">
              <label for="petName">Nombre</label>
              <vee-field id="petName" type="text" name="petName" />
              <ErrorMessage name="petName" class="error-message"></ErrorMessage>
            </div>
            <div class="input-item">
              <label for="petAge">Edad</label>
              <vee-field id="petAge" type="tel" maxlength="2" name="petAge" />
              <ErrorMessage name="petAge" class="error-message"></ErrorMessage>
            </div>
            <div class="input-item">
              <label for="petSpecie">Especie</label>
              <vee-field id="petSpecie" type="text" name="petSpecie" />
              <ErrorMessage name="petSpecie" class="error-message"></ErrorMessage>
            </div>
            <div class="input-item">
              <label for="petBreed">Raza</label>
              <vee-field id="petBreed" type="text" name="petBreed" />
              <ErrorMessage name="petBreed" class="error-message"></ErrorMessage>
            </div>
            <div class="input-item">
              <label for="petColor">Color</label>
              <vee-field id="petColor" type="text" name="petColor" />
              <ErrorMessage name="petColor" class="error-message"></ErrorMessage>
            </div>
            <div class="input-item">
              <label for="petDescription">Descripción de la mascota</label>
              <vee-field
                id="petDescription"
                name="petDescription"
                as="textarea"
                placeholder="Se lo mas descriptivo posible..."
              />
              <ErrorMessage name="petDescription" class="error-message"></ErrorMessage>
            </div>
          </div>
        </div>
        <div class="checkbox-filter-main-container mt-">
          <h4>
            Selecciona alguna opción que pueda ayudar a identificar la publicación y brinde más
            información
          </h4>
          <div class="checkbox-filter-container">
            <div class="checkbox-item item1">
              <vee-field id="petCBCorrea" type="checkbox" name="petCBCorrea" value="Correa" />
              <label for="petCBCorrea">Correa</label>
            </div>
            <div class="checkbox-item item2">
              <vee-field id="petCBCollar" type="checkbox" name="petCBCollar" value="Collar" />
              <label for="petCBCollar">Collar</label>
            </div>
            <div class="checkbox-item item3">
              <vee-field id="petCBBicolor" type="checkbox" name="petCBBicolor" value="Bicolor" />
              <label for="petCBBicolor">Bicolor</label>
            </div>
            <div class="checkbox-item item4">
              <vee-field
                id="petCBMonocolor"
                type="checkbox"
                name="petCBMonocolor"
                value="Monocolor"
              />
              <label for="petCBMonocolor">Monocolor</label>
            </div>
            <div class="checkbox-item item5">
              <vee-field
                id="petCBOrejasPunti"
                type="checkbox"
                name="petCBOrejasPunti"
                value="OrejasPuntiagudas"
              />
              <label for="petCBOrejasPunti">Orejas puntiagudas</label>
            </div>
            <div class="checkbox-item item6">
              <vee-field
                id="petCBOrejasCaidas"
                type="checkbox"
                name="petCBOrejasCaidas"
                value="OrejasCaidas"
              />
              <label for="petCBOrejasCaidas">Orejas caidas</label>
            </div>
            <div class="checkbox-item item7">
              <vee-field
                id="petCBColaLarga"
                type="checkbox"
                name="petCBColaLarga"
                value="ColaLarga"
              />
              <label for="petCBColaLarga">Cola larga</label>
            </div>
            <div class="checkbox-item item8">
              <vee-field
                id="petCBColaCorta"
                type="checkbox"
                name="petCBColaCorta"
                value="ColaCorta"
              />
              <label for="petCBColaCorta">Cola corta</label>
            </div>
            <div class="checkbox-item item9">
              <vee-field id="petCBConPlaca" type="checkbox" name="petCBConPlaca" value="ConPlaca" />
              <label for="petCBConPlaca">Con placa</label>
            </div>
            <div class="checkbox-item item10">
              <vee-field id="petCBSinPlaca" type="checkbox" name="petCBSinPlaca" value="SinPlaca" />
              <label for="petCBSinPlaca">Sin placa</label>
            </div>
          </div>
        </div>
        <div class="location-container">
          <div style="text-align: left" class="mb-3">
            <vee-field
              ref="petLastLocation"
              v-model="petLastLocation"
              name="petLastLocation"
              style="display: none"
            />
            <ErrorMessage name="petLastLocation" type="text" class="error-message"></ErrorMessage>
          </div>
          <MapComponent
            @pet-location="onPetLastLocationInput"
            @remove-address-value="onRemoveAddressValue"
          />
          <div class="details-location-last-seen">
            <div class="lastSeenDesc">
              <label for="lastSeenDesc">¿Dónde y a qué hora se vió la última vez?</label>
              <vee-field
                id="lastSeenDesc"
                name="lastSeenDesc"
                as="textarea"
                placeholder="Describe detalladamente el último lugar visto..."
              />
              <ErrorMessage name="lastSeenDesc" class="error-message"></ErrorMessage>
            </div>
          </div>
        </div>

        <div class="publish-btn">
          <button
            type="submit"
            :class="onSubmit ? 'on-submit' : ''"
            :disabled="onSubmit ? true : false"
          >
            <span v-if="!onSubmit">Publicar</span>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              style="margin: auto; background: none; display: block; shape-rendering: auto"
              width="200px"
              height="200px"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
            >
              <g transform="translate(80,50)">
                <g transform="rotate(0)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="1">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.875s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.875s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(71.21320343559643,71.21320343559643)">
                <g transform="rotate(45)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.875">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.75s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.75s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(50,80)">
                <g transform="rotate(90)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.75">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.625s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.625s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(28.786796564403577,71.21320343559643)">
                <g transform="rotate(135)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.625">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.5s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.5s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(20,50.00000000000001)">
                <g transform="rotate(180)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.5">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.375s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.375s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(28.78679656440357,28.786796564403577)">
                <g transform="rotate(225)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.375">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.25s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.25s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(49.99999999999999,20)">
                <g transform="rotate(270)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.25">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="-0.125s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="-0.125s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <g transform="translate(71.21320343559643,28.78679656440357)">
                <g transform="rotate(315)">
                  <circle cx="0" cy="0" r="6" fill="#fffafa" fill-opacity="0.125">
                    <animateTransform
                      attributeName="transform"
                      type="scale"
                      begin="0s"
                      values="1.5 1.5;1 1"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                    ></animateTransform>
                    <animate
                      attributeName="fill-opacity"
                      keyTimes="0;1"
                      dur="1s"
                      repeatCount="indefinite"
                      values="1;0"
                      begin="0s"
                    ></animate>
                  </circle>
                </g>
              </g>
              <!-- [ldio] generated by https://loading.io/ -->
            </svg>
          </button>
        </div>
        <p v-if="errorSubmitting" class="error-message mt-4 text-center">
          *Es necesario llenar todos los campos requeridos.
        </p>
      </vee-form>
    </article>

    <!-- Modal to confirm if post was sucessfully or if there was an error -->
    <div
      v-if="bgConfirmationModalIsOpen"
      style="position: fixed; z-index: 100; inset: 0; overflow: hidden"
      class="pt-4 px-4 pb-16"
    >
      <div
        style="display: flex; justify-content: center; align-items: center; min-height: 100vh"
        class="text-center"
      >
        <div
          style="
            position: fixed;
            inset: 0;
            overflow: hidden;
            transition-property: opacity;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          "
        >
          <div
            style="position: absolute; inset: 0; background-color: rgb(31 41 55 / 1)"
            class="opacity-75"
          ></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <Transition
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <ConfirmationModal
            v-if="ConfirmationModalIsOpen"
            :response-message="responseMessage"
            :request-success="requestSuccess"
            :close-confirmation-button="closeConfirmationButton"
            @close-confirmation-modal-button="closeConfirmationModal"
          />
        </Transition>
      </div>
    </div>
  </main>
</template>

<script>
import DropzoneImage from "@/components/DropzoneImage.vue";
import MapComponent from "@/components/MapComponent.vue";
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import router from "@/router";
import { v4 as uuidv4 } from "uuid";

// import axios from "axios";

export default {
  name: "LostPetFormView",
  components: {
    DropzoneImage,
    MapComponent,
    ConfirmationModal,
  },
  data() {
    return {
      user: {
        name: "Jeff Hardy",
        photo: "url",
      },
      lostPetRegistrationSchema: {
        petName: "required|alphaSpaces|min:3|max:100",
        petAge: "required|integer|min:1|max:2",
        petSpecie: "required|alphaSpaces|min:3|max:100",
        petColor: "required|alphaSpaces|min:3|max:100",
        petDescription: "required|alphaSpaces|min:3|max:500",
        lastSeenDesc: "required|alphaSpaces|min:3|max:500",
        petLastLocation: "required",
      },
      petCBOptions: [],
      petLastLocation: "",
      postId: "",
      minImagesUploaded: true,
      errorSubmitting: false,
      submitError: "",
      responseMessage: "",
      requestSuccess: false,
      onSubmit: false,
      bgConfirmationModalIsOpen: false,
      ConfirmationModalIsOpen: false,
      closeConfirmationButton: true,
    };
  },
  watch: {
    // Checks if the user submited a photo, if not feedback is given adding the error-clases
    minImagesUploaded() {
      if (this.minImagesUploaded)
        document
          .querySelector(".add-photo-container")
          .classList.remove("add-photo-container-border-missing");
      else
        document
          .querySelector(".add-photo-container")
          .classList.add("add-photo-container-border-missing");
    },
  },
  methods: {
    async registerLostPet(values) {
      this.onSubmit = true;
      try {
        this.postId = await uuidv4();
        // Verifies if are images uploaded, if not, feedback is given to the user
        if (this.$refs.DropzoneImageRef.imagesUploaded < 1) {
          this.minImagesUploaded = false;
          return;
        } else this.minImagesUploaded = true;

        // Resets the array
        this.petCBOptions = [];
        // Adds to petCBOptions the checkboxes value that are checked
        for (const key in values) {
          if (key.startsWith("petCB") && values[key]) {
            this.petCBOptions.push(values[key]);
          }
        }
        // Removes the petCB key-value pairs from the values object
        for (const key in values) {
          if (key.startsWith("petCB")) {
            delete values[key];
          }
        }
        values.filterOptions = this.petCBOptions;

        const uploadRequest = await this.$refs.DropzoneImageRef.uploadImages(this.postId);
        if (!uploadRequest.sucess) throw uploadRequest.error;

        values.petImagesURL = uploadRequest;
        values.postId = this.postId;

        // TODO --- FINISH AXIOS REQUEST
        // const axiosRequest = await axios.post("http://", { values });

        let statusCode = 100; // CHANGE IT TO AXIOS REQUEST CODE
        if (statusCode === 200) {
          // Background for confirmation modal is open first
          this.bgConfirmationModalIsOpen = true;
          // Indicates the button to close the modal is false - because it will automatically be closed and redirected to the posts page
          this.closeConfirmationButton = false;
          // Response message indicating the post was published successfully
          this.responseMessage = "¡Se ha publicado tu post con éxito!";
          // Indicates the modal to show the success message
          this.requestSuccess = true;
          // Opens the confirmation modal
          this.ConfirmationModalIsOpen = true;

          // Closes automatically the modal after 2 seconds if it isn't manually closed and redirects to posts page
          setTimeout(() => {
            this.closeConfirmationModal();
          }, 500);
        } else {
          throw { sucess: false, message: "error" };
        }
      } catch (error) {
        // TODO - HANDLE ERROR ON REQUEST FROM FIREBASE UPLOAD AND AXIOS REQUEST
        console.log(error);

        // Background for confirmation modal is open first
        this.bgConfirmationModalIsOpen = true;
        // Response message indicating there was an error
        this.responseMessage = error.message;
        // Opens the confirmation modal
        this.ConfirmationModalIsOpen = true;
      }
      // Loading icon is removed from the submit button
      this.onSubmit = false;
    },
    // Checks if the user submited a photo, if not feedback is given
    imageUploadChange(value) {
      if (value.value > 0) {
        this.minImagesUploaded = true;
      } else this.minImagesUploaded = false;
    },
    onPetLastLocationInput(value) {
      if (value.sucess) {
        this.petLastLocation = value.data;
        document.getElementById("addressInput").value = value.data;
      }
    },
    onRemoveAddressValue() {
      this.petLastLocation = "";
      document.getElementById("addressInput").value = "";
    },
    onInvalidSubmit() {
      if (this.$refs.DropzoneImageRef.imagesUploaded < 1) {
        this.minImagesUploaded = false;
      } else this.minImagesUploaded = true;
      this.errorSubmitting = true;
    },
    closeConfirmationModal() {
      // First the confirmation modal
      this.ConfirmationModalIsOpen = false;
      // Then the background, to make it smooth and redirects to login page
      setTimeout(() => {
        this.bgConfirmationModalIsOpen = false;
        router.go("/login");
      }, 200);
    },
  },
};
</script>

<style scoped lang="scss">
article {
  padding: 20px 0;
  h1 {
    padding: 15px 0;
  }
  width: 100%;
  min-width: 300px;
  max-width: 900px;
  box-shadow: 0 2px 5px rgba(185, 13, 13, 0.12);
}
input,
textarea {
  color: #212121;
}
button:hover {
  background: #101000;
}
.lost-pet-form {
  width: 100%;
  padding: 1rem;
}
.user-info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  .user-info-photo {
    border-radius: 50px;
    border: 2px solid #000000;
    margin-right: 10px;
    width: 40px;
    height: 40px;
    overflow: hidden;
    padding: 5px;
    img,
    svg {
      width: 100%;
      height: 100%;
    }
  }
  p {
    font-weight: 600;
    font-size: 1.1rem;
  }
}

.photos-container {
  .add-photo-container {
    max-width: 500px;
    min-width: 250px;
    height: 300px;
    border: 1px solid #212121;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
    }
    p {
      font-size: 1.1rem !important;
      margin-top: 20px;
    }
  }
  .photo-counter {
    text-align: left;
    margin: 10px 0;
  }
}
.inputs-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem 0;
  .input-item {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    margin: 5px 0;
    width: 100%;
    height: fit-content;
    max-width: 400px;

    label {
      margin-bottom: 5px;
      font-weight: 600;
    }
    input,
    textarea {
      display: block;
      width: 100%;
      padding: 10px;
      border: 1px solid #545454;
      border-radius: 5px;
      background-color: transparent;
      resize: none;
      &:focus {
        outline: 1px solid #212121;
      }
    }
    #petDescription {
      height: 200px;
    }
  }
}
.checkbox-filter-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 20px 20px 20px 20px;
  text-align: left;
  justify-content: space-around;
  padding: 20px;
  gap: 15px;
  margin: 0 auto;
  width: 100%;

  .checkbox-item {
    display: flex;
    align-items: center;
    margin: 5px 0;
    label {
      margin-left: 5px;
      cursor: pointer;
    }
    input {
      min-width: 20px;
      min-height: 20px;
      cursor: pointer;
    }
  }
  .item1 {
    grid-column: 1/1;
    grid-row: 1/1;
  }
  .item2 {
    grid-column: 1/1;
    grid-row: 2/2;
  }
  .item3 {
    grid-column: 1/1;
    grid-row: 3/3;
  }
  .item4 {
    grid-column: 1/1;
    grid-row: 4/4;
  }
  .item5 {
    grid-column: 2/2;
    grid-row: 1/1;
  }
  .item6 {
    grid-column: 2/2;
    grid-row: 2/2;
  }
  .item7 {
    grid-column: 2/2;
    grid-row: 3/3;
  }
  .item8 {
    grid-column: 2/2;
    grid-row: 4/4;
  }
}
.location-container {
  margin-top: 2rem;
  padding: 2rem 0;
  border-top: 2px solid #212121;
  .location-input {
    text-align: left;
    margin: 5px 0;
    width: 100%;

    label {
      margin-bottom: 5px;
      font-weight: 600;
    }
    input {
      display: block;
      width: 100%;
      padding: 10px;
      border: 1px solid #545454;
      border-radius: 5px;
      background-color: transparent;
      resize: none;
      &:focus {
        outline: 1px solid #212121;
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
.publish-btn {
  button {
    width: 50%;
    padding: 0.9em 1.6em;
    span {
      line-height: 1.5rem;
    }
    svg {
      width: 25px;
      height: 25px;
    }
  }
}

.on-submit:hover {
  cursor: not-allowed;
}
@media screen and (min-width: 900px) {
  .inputs-container {
    justify-content: space-around;
    .input-item {
      margin: 10px 0 !important;
    }
  }
  .checkbox-filter-container {
    width: 60%;
  }
}
</style>
