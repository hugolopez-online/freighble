import { useState } from 'react';
import Navbar from './app/components/Navbar';
import Search from './app/components/Search';
import Directory from './app/components/Directory';
import Banner from './app/components/Banner'

const defaultSpecs = {
  mode: "",
  origin: {
    city: "",
    state: "",
    region: "",
    country: ""
  },
  destination: {
    city: "",
    state: "",
    region: "",
    country: ""
  },
  border: "N/A",
  hazmat: false,
  team: false,
  usbond: false,
  canadabond: false
};

// const defaultFormData = {
//   mode: "",
//   originCity: "",
//   originState: "",
//   destinationCity: "",
//   destinationState: "",
//   border: "N/A",
//   hazmat: false,
//   team: false,
//   usbond: false,
//   canadabond: false
// };

function App() {
  const [specs, setSpecs] = useState(defaultSpecs);
  // const [formData, setFormData] = useState(defaultFormData);

  const resetSpecs = () => {
    setSpecs(defaultSpecs);
  };

  // const callTemplate = (factorData) => {
  //   setFormData((prev) => {
  //     return ({
  //       ...prev,
  //       mode: factorData.mode,
  //       originCity: factorData.origin.city,
  //       originState: factorData.origin.state,
  //       destinationCity: factorData.destination.city,
  //       destinationState: factorData.destination.state,
  //       border: factorData.border,
  //       hazmat: factorData.hazmat,
  //       team: factorData.team,
  //       usbond: factorData.usbond,
  //       canadabond: factorData.canadabond
  //     });
  //   });
  // };

  const templateSpecs = (retrievedTemplate) => {
    //RETRIEVE TEMPLATED SEARCH FORM DATA
    //TEST LOGS: DELETE AFTER TESTING
    console.log("I retrieved this, now how do I send it down to Search.jsx");
    console.log(retrievedTemplate);
  };

  return (
    <>
      <div className="row justify-content-md-center text-bg-dark shadow mb-4">
        <div className="col-12 col-md-10">
          <Navbar />
        </div>
      </div>
      <div className="row justify-content-md-center mb-3">
        <div id="searchForm" className="col-12 col-md-3 mb-3">
          <Search setSpecs={setSpecs} />
        </div>
        <div className="col-12 col-md-7 mb-3">
          <div className="row justify-content-md-center">
            <div id="informativeBanner" className="col-12">
              <Banner specs={specs} defaultSpecs={defaultSpecs} resetSpecs={resetSpecs} setSpecs={setSpecs} templateSpecs={templateSpecs} />
            </div>
          </div>
          <div className="row g-3 mb-3">
            <Directory specs={specs} />
          </div>
        </div>
      </div>
    </>
  )
};

export default App;
