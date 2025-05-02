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
    <div className='row m-0'>
      {/* <Navbar /> */}
      <Search formData={formData} setFormData={setFormData} defaultFormData={defaultFormData} setSpecs={setSpecs} />
      {/* <Banner /> */}
      <Directory specs={specs} defaultSpecs={defaultSpecs} resetSpecs={resetSpecs} setFormData={setFormData} defaultFormData={defaultFormData} setSpecs={setSpecs} />
    </div>
  )
};

export default App;
