<template>
  <div class="photos-container">
    <div ref="dropZoneRef" class="add-photo-container add-photo-container-border">
      <div class="dz-default dz-message">
        <svg xmlns="http://www.w3.org/2000/svg" height="2.5em" viewBox="0 0 448 512" width="2.5em">
          <path
            d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
          />
        </svg>
        <p>Haz click o arrastra para agregar una o varias fotos.</p>
      </div>
    </div>
    <div class="dz-preview custom-dz-preview"></div>
    <div class="photo-counter">
      <p>Fotos {{ imagesUploaded }}/7</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { Dropzone } from "dropzone";
import { uploadImages as fbUploadImages } from "@/includes/firebase.js";

const dropZoneRef = ref(null);
let imagesUploaded = ref(0);
let myDropzoneRef = null;
let petImagesURL = [];
const emit = defineEmits(["image-upload-change"]);

watch(imagesUploaded, (newimagesUploadedNum, oldimagesUploadedNum) => {
  if (newimagesUploadedNum === 6 && oldimagesUploadedNum === 7) {
    const dzMessage = document.querySelector(".dz-message");
    dzMessage.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="2.5em" viewBox="0 0 448 512" width="2.5em">
          <path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H384c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
        <p>Haz click o arrastra para agregar una o varias fotos.</p>`;
    dropZoneRef.value.classList.remove("add-photo-container-border-error");
  }
  emit("image-upload-change", imagesUploaded);
});

async function uploadImages() {
  try {
    petImagesURL = await fbUploadImages(myDropzoneRef);
    return petImagesURL;
  } catch (error) {
    console.error("Ha ocurrido un error, intenta mas tarde");
  }
}
// defineExpose will expose any function, var when using setup so it can be accessed in an instance
defineExpose({
  uploadImages,
  imagesUploaded,
});

onMounted(() => {
  if (!dropZoneRef.value !== null) {
    const myDropzone = new Dropzone(dropZoneRef.value, {
      url: "/",
      withCredentials: true,
      uploadMultiple: true,
      maxFiles: 7,
      clickable: true,
      addRemoveLinks: true,
      autoProcessQueue: false,
      parallelUploads: 7,
      previewsContainer: dropZoneRef.value.nextElementSibling,
      acceptedFiles: ".jpg, .jpeg, .png",
      dictRemoveFile: `<svg width="54" height="54" viewBox="0 0 54 54" fill="white" xmlns="http://www.w3.org/2000/svg">      <path d="M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z"></path></svg>`,
      dictUploadCanceled: "Imagen cancelada",
      dictInvalidFileType: "No se aceptan archivos de este tipo",
      dictFileTooBig: "El archivo es muy grande",
    });
    myDropzoneRef = myDropzone;
    myDropzone.on("maxfilesexceeded", (file) => {
      myDropzone.removeFile(file);
      const dzMessage = document.querySelector(".dz-message");
      dzMessage.innerHTML = `<p>Excediste el límite de fotos. 7/7.</p>`;
      dropZoneRef.value.classList.add("add-photo-container-border-error");
    });
    myDropzone.on("addedfile", () => {
      imagesUploaded.value++;
    });
    myDropzone.on("removedfile", () => {
      imagesUploaded.value--;
    });
  }
});
</script>

<style lang="scss">
.photos-container {
  width: 100%;
  max-width: 900px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.101676);
  .add-photo-container {
    max-width: 900px;
    min-width: 250px;
    height: 300px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      margin-top: 20px;
      padding: 0 20px;
    }
  }
  .add-photo-container-border-error {
    border: 2px dashed #dc2626 !important;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.12) !important;
    &:hover {
      cursor: no-drop !important;
    }
    svg {
      fill: #dc2626 !important;
    }
    p {
      font-size: 1.1rem !important;
      margin-top: 20px !important;
      color: #dc2626 !important;
      font-weight: 600 !important;
      font-size: 1.2rem !important;
    }
  }
  .add-photo-container-border-missing {
    border: 2px dashed #dc2626 !important;
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.12) !important;
    svg {
      fill: #dc2626 !important;
    }
    p {
      font-size: 1.1rem !important;
      margin-top: 20px !important;
      color: #dc2626 !important;
      font-weight: 600 !important;
      font-size: 1.2rem !important;
    }
  }
  .add-photo-container-border {
    border: 1px solid #212121;
    &:hover {
      cursor: pointer;
      border: 2px dashed #212121;
      box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.12);
    }
    p {
      font-weight: 400;
      font-size: 1.1rem !important;
    }
  }
  .photo-counter {
    p {
      text-align: left;
      padding: 0 5px 10px;
    }
  }
}
.custom-dz-preview {
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .dz-image-preview,
  .dz-error {
    position: relative;
    display: inline-block;
    width: 100px;
    margin: 10px;
  }
  .dz-image {
    width: 100%;
    border-radius: 30px;
    overflow: hidden;
    img {
      width: 100px;
      height: 100px;
    }
  }
  .dz-details {
    span {
      font-size: 0.8rem;
    }
    .dz-filename,
    .dz-size {
      display: none;
    }
  }
  .dz-remove {
    position: absolute;
    top: -18px;
    right: -18px;
    svg {
      width: 45px;
      height: 45px;
      stroke: #212121;
      stroke-width: 1;
    }
    &:hover {
      opacity: 0.8;
      svg {
        stroke: #dc2626;
      }
    }
  }
  .dz-success-mark,
  .dz-error-mark {
    display: none;
  }
  .dz-error {
    .dz-image {
      background: #21212199;
      img {
        visibility: hidden;
      }
    }
  }
  .dz-error-message {
    margin-top: 5px;
  }
}
</style>
