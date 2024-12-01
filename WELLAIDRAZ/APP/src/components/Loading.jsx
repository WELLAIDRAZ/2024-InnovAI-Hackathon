'use client';

import ClipLoader from 'react-spinners/ClipLoader';
import "@/app/globals.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#067873",
};

const Loading = ({ loading }) => {
  return (
      <ClipLoader
        color="#067873"
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    )
};
export default Loading;
