import React from "react";
import { MapContainer, ImageOverlay, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import styled from "styled-components";
import { deletePost } from "../lib/firebase";
import useDataFetch from "../hooks/useDataFetch";
import Navbar from "../components/Navbar";

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

const LearnPage = () => {
  const { doc } = useDataFetch();

  if (!doc) {
    return null;
  }

  const position = [244.1, 649.065];
  const bounds = [
    [0, 0],
    [488.2, 1299.3],
  ];

  const displayPins = doc.map((d) => {
    return (
      <ImageOverlay
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
          <DeleteButton
            onClick={() => {
              deletePost(d.id);
            }}
          >
            o
          </DeleteButton>
          <h1>{d.name}</h1>
          {d.altname.length > 0 && <h2>{d.altname}</h2>}
          {d.altitude.length > 0 && <h2>{d.altitude}</h2>}
          {d.keystoneone.length > 0 && <p>{d.keystoneone}</p>}
          {d.keystonetwo.length > 0 && <p>{d.keystonetwo}</p>}
          <p>{d.notes}</p>
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
        preferCanvas="true"
        maxBoundsViscosity={1.0}
        className="mapContainer"
        center={position}
        zoom={2}
        style={{ height: "100vh", width: "100vw" }}
        crs={CRS.Simple}
      >
        <ImageOverlay bounds={bounds} url="./map.jpg"></ImageOverlay>
        {displayPins}
      </MapContainer>
    </>
  );
};

export default LearnPage;
