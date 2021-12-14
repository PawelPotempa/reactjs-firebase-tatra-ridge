import React, { useState } from "react";
import { MapContainer, ImageOverlay, useMapEvents, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import "../App.css";
import { createPost, deletePost } from "../lib/firebase";
import useDataFetch from "../hooks/useDataFetch";
import Navbar from "../components/Navbar";

const EditPage = () => {
  const { doc } = useDataFetch();

  const [formValues, setFormValues] = useState({
    latitude: "",
    longitude: "",
    shape: "",
    name: "",
    altname: "",
    height: "",
    keystoneone: "",
    keystonetwo: "",
    notes: "",
  });

  if (!doc) {
    return null;
  }

  const position = [244.1, 649.065];
  const bounds = [
    [0, 0],
    [488.2, 1299.3],
  ];

  const Pins = () => {
    const map = useMapEvents({
      click(e) {
        setFormValues({
          ...formValues,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
        });
      },
    });
    return null;
  };

  const valueChangeHandler = (e) => {
    const id = e.target.id;
    const newValue = e.target.value;
    setFormValues({ ...formValues, [id]: newValue });
  };

  const shapeHandler = (e) => {
    const src = e.target.src;
    const res = src.split("/");
    setFormValues({
      ...formValues,
      shape: res[3],
    });
  };
  // Function responsible for handling the form submition.
  const submitHandler = (e) => {
    // This prevents the default functionality of submitting a form.
    e.preventDefault();

    // Attempt to create a new post.
    createPost(formValues)
      .then(() => {
        // Update the isLoading state and navigate to the home page.
        console.log("Pin added!");
      })
      .catch((err) => {
        // Alert the error and update the isLoading state.
        alert(err);
      });
  };

  const displayPins = doc.map((d) => {
    return (
      <ImageOverlay
        className="img-overlay"
        alt={d.name}
        key={d.id}
        bounds={[
          [d.latitude - 1.4, d.longitude - 1.4],
          [d.latitude + 1.4, d.longitude + 1.4],
        ]}
        interactive={true}
        url={`./${d.shape}`}
      >
        <Popup>
          <button
            onClick={() => {
              deletePost(d.id);
            }}
          >
            Usuń znacznik
          </button>
        </Popup>
      </ImageOverlay>
    );
  });

  return (
    <>
      <Navbar />
      <div class="formContainer">
        <form onSubmit={submitHandler}>
          <input
            id="latitude"
            htmlFor="latitude"
            type="text"
            value={formValues.latitude}
            onChange={valueChangeHandler}
            className="pinInput hidden"
          ></input>
          <input
            id="longitude"
            htmlFor="longitude"
            type="text"
            value={formValues.longitude}
            onChange={valueChangeHandler}
            className="pinInput hidden"
          ></input>
          <input
            id="shape"
            htmlFor="shape"
            type="text"
            value={formValues.shape}
            onChange={valueChangeHandler}
            className="pinInput hidden"
          ></input>
          <input
            id="name"
            htmlFor="name"
            type="text"
            placeholder="Nazwa"
            onChange={valueChangeHandler}
            value={formValues.name}
            className="pinInput"
          ></input>
          <input
            id="altname"
            htmlFor="altname"
            type="text"
            placeholder="Nazwa Alternatywna"
            onChange={valueChangeHandler}
            value={formValues.altname}
            className="pinInput"
          ></input>
          <input
            id="height"
            htmlFor="height"
            type="text"
            placeholder="Wysokość"
            onChange={valueChangeHandler}
            value={formValues.height}
            className="pinInput"
          ></input>
          <input
            id="notes"
            htmlFor="notes"
            type="textarea"
            placeholder="Notatki"
            onChange={valueChangeHandler}
            value={formValues.notes}
            className="pinInput"
          ></input>
          {formValues.shape == "cross.svg" && (
            <input
              id="keystoneone"
              htmlFor="keystoneone"
              type="text"
              placeholder="Zwornik"
              value={formValues.keystoneone}
              onChange={valueChangeHandler}
              className="pinInput"
            ></input>
          )}
          {formValues.shape == "cross.svg" && (
            <input
              id="keystonetwo"
              htmlFor="keystonetwo"
              type="text"
              placeholder="Zwornik"
              value={formValues.keystonetwo}
              onChange={valueChangeHandler}
              className="pinInput"
            ></input>
          )}
          <img
            className="pinShapePreview"
            src={
              formValues.shape.length > 0
                ? `/${formValues.shape}`
                : "/thinking.svg"
            }
          ></img>
          <button type="submit">Dodaj znacznik</button>
          <p className="shapeText">Wybierz kształt:</p>
        </form>
        <div class="shapesContainer">
          <img
            className="pinShape"
            src="/square.svg"
            onClick={shapeHandler}
          ></img>
          <img
            className="pinShape"
            src="/circle.svg"
            onClick={shapeHandler}
          ></img>
          <img
            className="pinShape"
            src="/hexagon.svg"
            onClick={shapeHandler}
          ></img>
          <img
            className="pinShape"
            src="/cross.svg"
            onClick={shapeHandler}
          ></img>
        </div>
      </div>

      <MapContainer
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        className="mapContainer"
        center={position}
        zoom={2}
        style={{ height: "100vh", width: "100vw" }}
        crs={CRS.Simple}
      >
        <ImageOverlay bounds={bounds} url="./map.jpg"></ImageOverlay>
        <Pins />
        {displayPins}
      </MapContainer>
    </>
  );
};

export default EditPage;
