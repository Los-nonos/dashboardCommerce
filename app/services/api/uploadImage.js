// eslint-disable-next-line import/no-cycle
import Api from "./api";

class ImageUpload {
  imageUpload = async formDataImage => {
    let loadResponse;
    try {
      loadResponse = await Api.post(`upload-image/`, formDataImage, {
        "Content-Type": "multipart/form-data"
      });
    } catch (err) {
      loadResponse = err;
    }
    return loadResponse;
  };
}

export default new ImageUpload();
