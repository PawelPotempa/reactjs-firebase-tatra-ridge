import React, { useState, useRef } from "react";
import { MapContainer, ImageOverlay, useMapEvents, Popup } from "react-leaflet";
import { circle, CRS } from "leaflet";
import styled from "styled-components";
import "../App.css";
import { createPost, deletePost } from "../lib/firebase";
import useDataFetch from "../hooks/useDataFetch";
import Navbar from "../components/Navbar";

export const Container = styled.div`
  position: absolute;
  background: #2e2e2e;
  -webkit-box-shadow: 5px 8px 16px -7px rgba(66, 68, 90, 1);
  -moz-box-shadow: 5px 8px 16px -7px rgba(66, 68, 90, 1);
  box-shadow: 5px 8px 16px -7px rgba(66, 68, 90, 1);
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: auto;
  width: 30%;
  top: 50%;
  margin-top: -25vh;
  padding: 0.7em 0.7em 0.7em 0;
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 90%;
  height: 15px;
  border-radius: 5px;
  border: 1px solid #000;
  margin-top: 5px;
  z-index: 9999;

  :nth-of-type(8) {
    margin-bottom: 5px;
  }
`;

const Textarea = styled.textarea`
  width: 90%;
  height: 15px;
  border-radius: 5px;
  border: 1px solid #000;
  margin-top: 5px;
  z-index: 9999;
  height: auto;
  resize: none;
`;

const ShapeText = styled.p`
  margin: 10px 0 0 0px;
  color: #fff;
  text-align: center;
`;

const ShapeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  height: 30px;
  width: auto;
  z-index: 999;
`;

const ShapePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ShapePreviewImg = styled.img`
  width: 20%;
  padding-bottom: 1em;
  filter: invert(73%) sepia(81%) saturate(407%) hue-rotate(133deg)
    brightness(191%) contrast(97%);
`;

const ShapeImg = styled.img`
  height: 100%;
  filter: invert(59%) sepia(69%) saturate(1644%) hue-rotate(2deg)
    brightness(107%) contrast(103%);
`;

const Button = styled.button``;

const EditPage = () => {
  const { doc } = useDataFetch();
  const placeholderPin = useRef();
  const shapePreview = useRef();

  const [formValues, setFormValues] = useState({
    latitude: "",
    longitude: "",
    shape: "./circle.svg",
    name: "",
    altname: "",
    altitude: "",
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

  const faraway = [
    [6, 17],
    [9, 20],
  ];

  const Pins = () => {
    const map = useMapEvents({
      click(e) {
        let lat = e.latlng.lat;
        let lng = e.latlng.lng;
        setFormValues({
          ...formValues,
          latitude: lat,
          longitude: lng,
        });
        placeholderPin.current._bounds._northEast = {
          lat: lat + 1.4,
          lng: lng + 1.4,
        };
        placeholderPin.current._bounds._southWest = {
          lat: lat - 1.4,
          lng: lng - 1.4,
        };
        let data = { lat, lng };
        map.flyTo(data, 4);
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
    console.log(formValues);
    placeholderPin.current._image.src = `./${res[3]}`;
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
        setFormValues({
          ...formValues,
          name: "",
          altname: "",
          altitude: "",
          keystoneone: "",
          keystonetwo: "",
          notes: "",
        });
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
        url={d.shape}
      >
        <Popup>
          <Button
            onClick={() => {
              deletePost(d.id);
            }}
          >
            Usuń znacznik
          </Button>
        </Popup>
      </ImageOverlay>
    );
  });

  return (
    <>
      <Navbar />
      <Container>
        <Form onSubmit={submitHandler}>
          <Input
            id="latitude"
            htmlFor="latitude"
            type="text"
            value={formValues.latitude}
            onChange={valueChangeHandler}
            className="hidden"
          ></Input>
          <Input
            id="longitude"
            htmlFor="longitude"
            type="text"
            value={formValues.longitude}
            onChange={valueChangeHandler}
            className="hidden"
          ></Input>
          <Input
            id="shape"
            htmlFor="shape"
            type="text"
            value={formValues.shape}
            onChange={valueChangeHandler}
            className="hidden"
          ></Input>
          <Input
            id="name"
            htmlFor="name"
            type="text"
            placeholder="Nazwa"
            onChange={valueChangeHandler}
            value={formValues.name}
          ></Input>
          <Input
            id="altname"
            htmlFor="altname"
            type="text"
            placeholder="Nazwa Alternatywna"
            onChange={valueChangeHandler}
            value={formValues.altname}
          ></Input>
          <Input
            id="altitude"
            htmlFor="altitude"
            type="text"
            placeholder="Wysokość"
            onChange={valueChangeHandler}
            value={formValues.altitude}
          ></Input>
          <Textarea
            id="notes"
            rows="10"
            htmlFor="notes"
            type="textarea"
            placeholder="Notatki"
            onChange={valueChangeHandler}
            value={formValues.notes}
          ></Textarea>
          {formValues.shape == "cross.svg" && (
            <Input
              id="keystoneone"
              htmlFor="keystoneone"
              type="text"
              placeholder="Zwornik"
              value={formValues.keystoneone}
              onChange={valueChangeHandler}
            ></Input>
          )}
          {formValues.shape === "cross.svg" && (
            <Input
              id="keystonetwo"
              htmlFor="keystonetwo"
              type="text"
              placeholder="Zwornik"
              value={formValues.keystonetwo}
              onChange={valueChangeHandler}
            ></Input>
          )}

          <Button type="submit">Dodaj znacznik</Button>
          <ShapeText className="shapeText">Wybierz kształt:</ShapeText>
        </Form>
        <ShapeContainer>
          <ShapeImg src="/circle.svg" onClick={shapeHandler}></ShapeImg>
          <ShapeImg src="/square.svg" onClick={shapeHandler}></ShapeImg>
          <ShapeImg src="/hexagon.svg" onClick={shapeHandler}></ShapeImg>
          <ShapeImg src="/cross.svg" onClick={shapeHandler}></ShapeImg>
        </ShapeContainer>
        <ShapePreviewContainer className="shapePreviewContainer">
          <ShapeText className="shapeText">Wybrany kształt:</ShapeText>
          <ShapePreviewImg
            ref={shapePreview}
            className="pinShapePreview"
            src={
              formValues.shape.length > 0
                ? `/${formValues.shape}`
                : "/circle.svg"
            }
          ></ShapePreviewImg>
        </ShapePreviewContainer>
      </Container>

      <MapContainer
        maxBounds={bounds}
        doubleClickZoom={false}
        maxBoundsViscosity={1.0}
        className="mapContainer"
        center={position}
        zoom={2}
        style={{ height: "100vh", width: "100vw" }}
        crs={CRS.Simple}
      >
        <ImageOverlay bounds={bounds} url="./map.jpg"></ImageOverlay>
        <ImageOverlay
          ref={placeholderPin}
          bounds={faraway}
          url="./circle.svg"
          className="placeholderPin"
        ></ImageOverlay>
        <Pins />
        {displayPins}
      </MapContainer>
    </>
  );
};

export default EditPage;
