const specsWeight = {
    mandatory: 70,
    desirable: {
        oStateW: 0,
        dStateW: 0,
    },
    additional: {},
};

const computeWeight = () => {
    const maxScore = 99;
    for (let spec in specsWeight.desirable) {
        console.log((maxScore - specsWeight.mandatory)/Object.keys(specsWeight.desirable).length);
        
        specsWeight.desirable[spec] = (maxScore - specsWeight.mandatory)/Object.keys(specsWeight.desirable).length;
    }
};

computeWeight();

export default specsWeight;
