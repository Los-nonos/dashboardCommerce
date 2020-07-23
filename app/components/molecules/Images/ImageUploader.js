import React from "react";

class ImageUploader extends React.Component {
  showWidget = () => {
    this.widget.open();
  };

  checkUploadResult = resultEvent => {
    if (resultEvent.event === "success") {
      console.log(resultEvent.info.secure_url);
    }
  };

  render() {
    this.widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dhbwfcydx",
        uploadPreset: "dfxe94d1"
      },
      (error, result) => {
        console.log(error);
        this.checkUploadResult(result);
      }
    );

    return (
      <div id={"photo-form-container"}>
        <button onClick={this.showWidget}>Cargar imagen</button>
      </div>
    );
  }
}

export default ImageUploader;
