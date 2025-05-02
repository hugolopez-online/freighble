const specsWeight = {
    mandatory: {
        modeW: 0,
        oCountryW: 0,
        dCountryW: 0,
        borderW: 0,
        hazmatW: 0,
        teamW: 0,
        usbondW: 0,
        canadabondW: 0
    },
    desirable: {
        oStateW: 0,
        dStateW: 0
    },
    additional: {}
};

const weightCompute = () => {
    const weightBase = 99;
    for (let mandatorySpec in specsWeight.mandatory) {
        specsWeight.mandatory[mandatorySpec] = (weightBase/(Object.keys(specsWeight.mandatory).length+1))*1.05;
    };

    for (let desirableSpec in specsWeight.desirable) {
        specsWeight.desirable[desirableSpec] = (weightBase-(Object.values(specsWeight.mandatory)[0]*Object.keys(specsWeight.mandatory).length))/Object.keys(specsWeight.desirable).length;
    };
};

weightCompute();

export default specsWeight;