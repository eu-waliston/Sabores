import React, { useState } from "react";
import Feed from "../../Components/Feed/Feed";
import LoadingSpinner from "../../Components/Common/LoadingSpinner";
import "./Discover.scss";

const Discover = () => {
  const [loading, setLoading] = useState(true);

  return (
    <main className="page discover">

      <Feed
        variant="discover"
        onLoadingChange={setLoading}
      />
    </main>
  );
};

export default Discover;
