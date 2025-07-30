import tours from "../data/tours";
import styles from "../styles/Main.module.css";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Main() {
  const [favorites, setFavorites] = useState([]);
  const [modalTour, setModalTour] = useState(null);

  const toggleFavorite = (id) => {
    setFavorites((favs) =>
      favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
    );
  };

  return (
    <main className={styles.main} role="main">
      <div className={styles.grid} aria-label="Tourist places list">
        {tours.map((tour) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4 }}
            className={styles.card}
            key={tour.id}
          >
            <div className={styles.imageWrapper}>
              <img
                src={tour.image}
                alt={tour.title}
                loading="lazy"
                srcSet={tour.image + " 2x"}
                className={styles.image}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x240?text=Image+Not+Found";
                }}
                tabIndex="0"
              />
              <button
                aria-label={
                  favorites.includes(tour.id)
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                className={styles.favorite}
                onClick={() => toggleFavorite(tour.id)}
                style={{
                  color: favorites.includes(tour.id) ? "#00bcd4" : "#bbbbbb",
                }}
                tabIndex="0"
              >
                <FaHeart size={24} />
              </button>
            </div>
            <div className={styles.content}>
              <h2>{tour.title}</h2>
              <p>{tour.description}</p>
              <button
                className={styles.detailBtn}
                onClick={() => setModalTour(tour)}
                aria-label={`View details for ${tour.title}`}
              >
                Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {modalTour && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalTour(null)}
            aria-modal="true"
            role="dialog"
            tabIndex="0"
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={modalTour.image}
                alt={modalTour.title}
                className={styles.modalImg}
              />
              <h2>{modalTour.title}</h2>
              <p>{modalTour.description}</p>
              <button
                onClick={() => setModalTour(null)}
                className={styles.closeBtn}
                aria-label="Close details"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
