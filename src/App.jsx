import { useState } from 'react';
import Navbar from './app/components/Navbar';
import Search from './app/components/Search';
import Directory from './app/components/Directory';
import Banner from './app/components/Banner'
//import './App.css';

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
  border: "Not Applicable",
  hazmat: false,
  team: false,
  usbond: false,
  canadabond: false
};

const defaultFormData = {
  mode: "void",
  originCity: "",
  originState: "void",
  destinationCity: "",
  destinationState: "void",
  border: "Not Applicable",
  hazmat: false,
  team: false,
  usbond: false,
  canadabond: false
};

function App() {
  const [specs, setSpecs] = useState(defaultSpecs);
  const [formData, setFormData] = useState(defaultFormData);

  const resetSpecs = () => {
    setSpecs(defaultSpecs);
  };

  return (
    <>
      <div className="row justify-content-md-center text-bg-dark">
        <div className="col-12 col-md-10">
          <Navbar />
        </div>
      </div>
      <div className="row justify-content-md-center">
        <div className="col-12 col-md-3">
          <Search formData={formData} setFormData={setFormData} defaultFormData={defaultFormData} setSpecs={setSpecs} />
        </div>
        <div className="col-12 col-md-7">
          <div className="row justify-content-md-center">
            <div className="col-12">
              <Banner specs={specs} />
            </div>
          </div>
          <div className="row g-3">
            <Directory specs={specs} defaultSpecs={defaultSpecs} resetSpecs={resetSpecs} setFormData={setFormData} defaultFormData={defaultFormData} setSpecs={setSpecs} />
          </div>
        </div>
      </div>
    </>
  )
};

export default App;
