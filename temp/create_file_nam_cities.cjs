const { log } = require("console");
const fs = require("fs");

let can_cities_lite;
let usa_cities_lite;
let mex_cities_lite;
let nam_cities = [];

const can_cities = JSON.parse(
    fs.readFileSync("./can.json", { encoding: "utf8", flag: "rs" })
);
const usa_cities = JSON.parse(
    fs.readFileSync("./usa.json", { encoding: "utf8", flag: "rs" })
);
const mex_cities = JSON.parse(
    fs.readFileSync("./mex.json", { encoding: "utf8", flag: "rs" })
);

const can_filtered = can_cities.filter(
    (city) => Number(city.population) >= 7250
);

const usa_filtered = usa_cities.filter(
    (city) => Number(city.population) >= 50000
);

can_cities_lite = can_filtered.map((city) => {
    return {
        search: `${city.city_ascii || city.city}, ${city.province_id}`,
        city: city.city_ascii || city.city,
        territory: city.province_id,
    };
});

usa_cities_lite = usa_filtered.map((city) => {
    return {
        search: `${city.city_ascii || city.city}, ${city.state_id}`,
        city: city.city_ascii || city.city,
        territory: city.state_id,
    };
});

mex_cities_lite = mex_cities.map((city) => {
    return {
        search: `${city.city}, ${city.admin_name}`,
        city: city.city,
        territory: city.admin_name,
    };
});

for (let city of can_cities_lite) {
    nam_cities.push(city);
}

for (let city of usa_cities_lite) {
    nam_cities.push(city);
}

for (let city of mex_cities_lite) {
    nam_cities.push(city);
}

fs.writeFileSync("nam_cities.json", JSON.stringify(nam_cities));
