import React, { useState, useRef } from "react";
import { MapContainer, ImageOverlay, useMapEvents, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import styled from "styled-components";
import { createPost, deletePost } from "../lib/firebase";
import useDataFetch from "../hooks/useDataFetch";
import Navbar from "../components/Navbar";

const Input = styled.input``;
const Button = styled.button``;
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 0 4px 0;
  border: none;
  text-align: center;
  width: 18px;
  height: 14px;
  font: 16px/14px Tahoma, Verdana, sans-serif;
  color: #c3c3c3;
  text-decoration: none;
  font-weight: bold;
  background: transparent;
  cursor: pointer;
`;

const EditPage = () => {
  const { doc } = useDataFetch();
  const randomElement = useRef();

  const [answer, setAnswer] = useState(false);
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
  const randomEl = doc[getRandomElFromArray(doc.length)];

  function getRandomElFromArray(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  const Pins = () => {
    const map = useMapEvents({
      click(e) {
        let data = {
          lat: randomElement.current._bounds._northEast.lat,
          lng: randomElement.current._bounds._northEast.lng,
        };
        map.flyTo(data, 4);
      },
    });
    return null;
  };

  const valueCompare = (e) => {
    const data = e.target.dataset.tag;
    const value = e.target.value;
    if (data !== value) {
      console.log("WRONG");
      document.querySelector(`img[alt="${data}"]`).className =
        "leaflet-image-layer leaflet-zoom-animated leaflet-interactive img-overlay-wrong";
    } else {
      console.log("CORRECT");
      document.querySelector(`img[alt="${data}"]`).className =
        "leaflet-image-layer leaflet-zoom-animated leaflet-interactive img-overlay-correct";
    }
  };

  const displayPins = (randomEl) => {
    return (
      <ImageOverlay
        ref={randomElement}
        className="img-overlay"
        alt={randomEl.name}
        key={randomEl.id}
        bounds={[
          [randomEl.latitude - 1.4, randomEl.longitude - 1.4],
          [randomEl.latitude + 1.4, randomEl.longitude + 1.4],
        ]}
        interactive={true}
        url={`./${randomEl.shape}`}
      >
        <Popup>
          <Input
            type="text"
            data-tag={randomEl.name}
            onChange={valueCompare}
          ></Input>
          <Button
            onClick={() => {
              setAnswer((prevAnswer) => !prevAnswer);
            }}
          >
            Następny!
          </Button>
          <DeleteButton
            className="deleteButton"
            onClick={() => {
              deletePost(randomEl.id);
            }}
          >
            o
          </DeleteButton>
        </Popup>
      </ImageOverlay>
    );
  };

  return (
    <>
      <Navbar />
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
        <ImageOverlay bounds={bounds} url="./mapempty.jpg"></ImageOverlay>
        <Pins />
        {displayPins(randomEl)}
      </MapContainer>
    </>
  );
};

export default EditPage;
