const suitability_weight = {
    mandatory: 60,
    desirable: {
        origin_territory_weight: 0,
        destination_territory_weight: 0,
    },
    additional: 0,
};

const computeWeight = () => {
    const cap_desirable = 85;
    suitability_weight.additional = 100 - cap_desirable;

    for (let spec in suitability_weight.desirable) {
        suitability_weight.desirable[spec] =
            (cap_desirable - suitability_weight.mandatory) /
            Object.keys(suitability_weight.desirable).length;
    }
};

computeWeight();

export default suitability_weight;
