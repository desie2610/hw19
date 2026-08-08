import { useCallback, useMemo, useState } from "react";
import axios from "axios";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";
import Modal from "./components/Modal/Modal";

import "./App.css";

const API_KEY = "54251373-2a4c32186818dc40d01b0d483";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = useCallback(async (searchQuery, currentPage) => {
    setLoading(true);

    try {
      const response = await axios.get("https://pixabay.com/api/", {
        params: {
          key: API_KEY,
          q: searchQuery,
          page: currentPage,
          image_type: "photo",
          orientation: "horizontal",
          per_page: 12,
        },
      });

      const newImages = response.data.hits.map(
        ({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        })
      );

      setImages((prevImages) =>
        currentPage === 1
          ? newImages
          : [...prevImages, ...newImages]
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearch = useCallback((searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);

    fetchImages(searchQuery, 1);
  }, [fetchImages]);

  const handleLoadMore = useCallback(() => {
    const nextPage = page + 1;

    setPage(nextPage);
    fetchImages(query, nextPage);
  }, [page, query, fetchImages]);

  const handleImageClick = useCallback((image) => {
    setSelectedImage(image);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const hasImages = useMemo(() => images.length > 0, [images]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />

      {loading && <Loader />}

      {hasImages && (
        <>
          <ImageGallery
            images={images}
            onImageClick={handleImageClick}
          />

          {!loading && <Button onClick={handleLoadMore} />}
        </>
      )}

      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
}