import { getStorage, ref as refFirebase, uploadBytes, getDownloadURL } from "firebase/storage";

export async function uploadImages(dropzoneRef, postId) {
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
            `lost-posts/userId/lost-post/${postId}/images/${file.upload.uuid}.png`,
          );
          const uploadTask = await uploadBytes(imageRef, file, metaData);

          const downloadURL = await getDownloadURL(uploadTask.ref);
          petImagesURL.push(downloadURL);
        }),
      );
      return { sucess: true, data: petImagesURL };
    } else return { sucess: false, error: "No hay archivos." };
  } catch (error) {
    return { sucess: false, error: "Ha ocurrido un error, intenta mas tarde." };
  }
}

export async function downloadImages() {
  return;
}
