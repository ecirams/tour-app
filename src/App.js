import Header from "./components/Header";
import Footer from "./components/Footer";
import React, { Suspense, lazy } from "react";

const Main = lazy(() => import("./components/Main"));

function App() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            Loading...
          </div>
        }
      >
        <Main />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
