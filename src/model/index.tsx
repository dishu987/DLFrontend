import { useRef, useState } from "react";
import sample1 from "./../assets/sample1.jpg";
import sample2 from "./../assets/sample2.jpg";
import sample3 from "./../assets/sample3.jpg";

const ModelDL = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [outputImage, setImageOutput] = useState<string>("");
  const [inputImage, setInputImage] = useState<any>(null);
  const [radius, setRadius] = useState<string>("3");
  const output_img_ref = useRef<any>(null);

  const handlePOST = () => {
    setLoading(true);
    const formData = new FormData();
    console.log(inputImage);
    formData.append("image", inputImage);
    formData.append("radius", radius);

    fetch("https://app-wg9m.onrender.com/api/test/", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data?.image_data);
        setImageOutput(data?.image_data);
        if (output_img_ref.current) {
          output_img_ref.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };
  return (
    <div className="container">
      <div className="col-sm-12 text-center my-5 text-primary">
        <h1>Deep Learning Image Processing</h1>
      </div>
      <div className="card p-3 w-100">
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Select Image
          </label>
          <input
            className="form-control"
            type="file"
            name="inputImage"
            onChange={(e: any) => setInputImage(e.target.files[0])}
            id=""
            accept="image/jpeg, image/jpg"
          />
        </div>{" "}
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Radius of Kernal({radius})
          </label>
          <input
            type="range"
            onChange={(e) => setRadius(e.target.value)}
            min={3}
            max={50}
            step={1}
            id=""
            value={radius}
            className="form-control form-range"
          />
        </div>{" "}
        <button className="btn btn-danger" onClick={handlePOST}>
          {loading ? (
            <>
              <div
                className="spinner-border spinner-border-sm mx-3"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading...
            </>
          ) : (
            "Upload"
          )}
        </button>
        {/* <hr /> */}
        {/* <h4>Try with example Images:</h4>
        <div className="w-100 d-flex my-3  justify-content-around flex-wrap">
          <img
            style={{ width: "400px", cursor: "pointer" }}
            src={sample1}
            className="img-thumbnail"
            alt="sample image"
            onClick={() => {
              const imgObject = new Image();
              imgObject.src = sample1;
              imgObject.onload = () => {
                setInputImage({
                  src: sample1,
                  width: imgObject.width,
                  height: imgObject.height,
                  alt: "Sample Image",
                });
                handlePOST();
              };
            }}
          />
          <img
            style={{ width: "400px", cursor: "pointer" }}
            src={sample2}
            className="img-thumbnail"
            alt="sample image"
          />
          <img
            style={{ width: "400px", cursor: "pointer" }}
            src={sample3}
            className="img-thumbnail"
            alt="sample image"
          />
        </div> */}
      </div>
      <h1 className="text-success mt-5">Output Image:</h1>
      <hr />
      <div
        className="py-3 w-100 text-center"
        id="imageOutput"
        ref={output_img_ref}
      >
        {loading && "Loading..."}
        {!loading && (
          <>
            {outputImage && (
              <>
                <div className="w-100">
                  <img
                    style={{ width: "500px", margin: "20px" }}
                    src={"data:image/jpeg;base64," + outputImage}
                    alt="output_image"
                    className="img-thumbnail"
                  />
                  <br />
                  <div className="my-4">
                    <a
                      href={"data:image/jpeg;base64," + outputImage}
                      download="output_image.jpg"
                      className="btn btn-secondary rounded-0 me-3"
                    >
                      Download Image
                    </a>
                    <button
                      className="btn btn-danger rounded-0"
                      onClick={() => location.reload()}
                    >
                      Reset Model
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModelDL;
