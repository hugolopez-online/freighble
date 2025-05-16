const suitability_weight = {
    mandatory: 70,
    desirable: {
        origin_territory_weight: 0,
        destination_territory_weight: 0,
    },
    additional: {},
};

const computeWeight = () => {
    const maxScore = 99;
    for (let spec in suitability_weight.desirable) {
        suitability_weight.desirable[spec] =
            (maxScore - suitability_weight.mandatory) /
            Object.keys(suitability_weight.desirable).length;
    }
};

computeWeight();

export default suitability_weight;
