import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import VideoPage from "./components/VideoPage";
import endPoint from "./config";
import axios from "axios";
import { SnackbarProvider } from "notistack";
import "./css/App.css";

const App = () => {
  let [videos, setVideos] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  const fetchVideos = async (url) => {
    try {
      setIsLoading(true);
      let response = await axios.get(url);
      let data = response.data.videos;
      setVideos(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos(endPoint);
  }, []);

  return (
    <>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Routes>
          <Route
            exact
            path="/"
            element={
              <LandingPage
                videos={videos}
                setVideos={setVideos}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                fetchVideos={fetchVideos}
              />
            }
          />
          <Route
            exact
            path="/video/:videoId"
            element={<VideoPage videos={videos} isLoading={isLoading} />}
          />
        </Routes>
      </SnackbarProvider>
    </>
  );
};

export default App;
