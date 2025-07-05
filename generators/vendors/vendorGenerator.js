/* Automatic generator of vendors */
/* This generator will upload vendors to the cloud database through a loop */
/* !!! USE WITH CAUTION !!! */

/* === === === === === */
// LAST USED on 2025-07-04 with `import vendors from "../../data/vendors.js"`
/* === === === === === */

// imports
import vendors from "../../data/vendors.js";

async function vendorsByBatch(unit) {
    const url = "http://localhost:8080/api/vendors";

    // batch-specific modificator START
    // IF NECESSARY, PLACE MODIFICATOR FOR A BATCH BELOW THIS LINE, AND THEN DELETE WHEN DONE
    // batch-specific modificator END

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(unit),
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.err}`);
        }

        const responseData = await response.json(); // Parse the JSON response
        console.log("Success:", responseData);
    } catch (error) {
        console.error("Error:", error);
    }
}

// uncomment below only if the explicit and conscious intention is to generate a new batch of vendors
// for (let vendor of vendors) {
//     vendorsByBatch(vendor);
// }
