import React, { useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Spinner({ loading }) {
  

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className='sweet-loading'
    >
      <GridLoader
        color='#006064'
        loading={loading}
        cssOverride={override}
        size={30}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}
