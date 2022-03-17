import React, { useState } from "react";
import { MapContainer, ImageOverlay, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import styled from "styled-components";
import { deletePost } from "../lib/firebase";
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

  const [answer, setAnswer] = useState(false);

  if (!doc) {
    return null;
  }

  const position = [244.1, 649.065];
  const bounds = [
    [0, 0],
    [488.2, 1299.3],
  ];

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
          <Input type="text" data-tag={d.name} onChange={valueCompare}></Input>
          {answer ? <p>{d.name}</p> : null}
          <Button
            onClick={() => {
              setAnswer((prevAnswer) => !prevAnswer);
            }}
          >
            Pokaż odpowiedź
          </Button>
          <DeleteButton
            className="deleteButton"
            onClick={() => {
              deletePost(d.id);
            }}
          >
            o
          </DeleteButton>
        </Popup>
      </ImageOverlay>
    );
  });

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
        {displayPins}
      </MapContainer>
    </>
  );
};

export default EditPage;
