import {
  getStorage,
  ref as refFirebase,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export async function uploadImages(dropzoneRef) {
  const petImagesURL = [];
  try {
    const storageRef = getStorage();

    const metaData = {
      contentType: "image/png",
    };

    // TODO send user id and post id
    if (dropzoneRef.files.length) {
      await Promise.all(
        dropzoneRef.files.map(async (file) => {
          const imageRef = refFirebase(
            storageRef,
            `lost-posts/userId/lost-post/postId/images/${file.upload.uuid}.png`,
          );
          const uploadTask = await uploadBytes(imageRef, file, metaData);

          const downloadURL = await getDownloadURL(uploadTask.ref);
          petImagesURL.push(downloadURL);
        }),
      );
      return petImagesURL;
    } else return { sucess: false, message: "No hay archivos." };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function downloadImages() {
  return;
}
