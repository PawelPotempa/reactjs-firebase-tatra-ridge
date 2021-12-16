import React from "react";
import { MapContainer, ImageOverlay, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import "../App.css";
import { deletePost } from "../lib/firebase";
import useDataFetch from "../hooks/useDataFetch";
import Navbar from "../components/Navbar";

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
          <a
            className="deleteButton"
            onClick={() => {
              deletePost(d.id);
            }}
          >
            o
          </a>
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
