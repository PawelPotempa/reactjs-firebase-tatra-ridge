import React, { useState } from "react";
import { MapContainer, ImageOverlay, Popup } from "react-leaflet";
import { CRS } from "leaflet";
import "../App.css";
import { deletePost } from "../lib/firebase";
import useDataFetch from "../hooks/useDataFetch";
import Navbar from "../components/Navbar";

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
          <input type="text" data-tag={d.name} onChange={valueCompare}></input>
          {answer ? <p>{d.name}</p> : null}
          <button
            onClick={() => {
              setAnswer((prevAnswer) => !prevAnswer);
            }}
          >
            Pokaż odpowiedź
          </button>
          <a
            className="deleteButton"
            onClick={() => {
              deletePost(d.id);
            }}
          >
            o
          </a>
        </Popup>
      </ImageOverlay>
    );
  });

  return (
    <>
      <Navbar />
      <MapContainer
        maxBounds={bounds}
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
