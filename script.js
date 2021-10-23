const webproj_srslist_url = "https://api.dataforsyningen.dk/rest/webproj/v1.0/crs/";
const webproj_info_url = "https://api.dataforsyningen.dk/rest/webproj/v1.0/crs/";
const webproj_trans_url = "https://api.dataforsyningen.dk/rest/webproj/v1.0/trans/"; // add {src}/{dst}/{v1}/{v2} at the end
const df_token_string = "?token=d2460098015969ae9229d18233f05a60"

let EPSG_data = []; // our database of projections and metadata

// for selecting different controls
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromSRS = document.querySelector(".from");
const toSRS = document.querySelector(".to");
let resultFrom;
let resultTo;
let searchValue;

getData();
setUpUI();
document.getElementById("bigheading").innerHTML = "Coordinate transformation"; // set title right when done loading data

// Event when fromSRS is changed
fromSRS.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
    document.getElementById('convert').disabled = !bothSRSselected();

    const e1 = document.getElementById('sel1');
    const e1_txt = e1.options[e1.selectedIndex].title; // title holds EPSG code
    let fromEPSG = metaByEPSG(e1_txt);
    document.getElementById('koordinatfromlabel1').innerHTML = fromEPSG["v1"];
    document.getElementById('koordinatfromlabel2').innerHTML = fromEPSG["v2"];
    document.getElementById('koordinatfromlabel3').innerHTML = fromEPSG["v3"];
    document.getElementById('koordinatfromlabel4').innerHTML = fromEPSG["v4"];

});

// Event when toSRS is changed
toSRS.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
    document.getElementById('convert').disabled = !bothSRSselected();
});

function metaByEPSG(EPSG) {
    // try searching for metadata for a given EPSG string
    for (const region of Object.keys(EPSG_data)) {
        // iterate over regions
        for (const epsgcode of Object.keys(EPSG_data[region])) {
            // iterate over projections
            if (EPSG_data[region][epsgcode]["EPSG"] === EPSG) return EPSG_data[region][epsgcode]
        }
    }
    return "not found"
}

function bothSRSselected() {
    const e1 = document.getElementById('sel1');
    const e2 = document.getElementById('sel2');
    const e1_txt = e1.options[e1.selectedIndex].title; // title holds EPSG code
    const e2_txt = e2.options[e2.selectedIndex].title;

    return e1_txt.includes(":") && e2_txt.includes(":");
}

search.addEventListener('input', updateValue);

convert.addEventListener("click", getResults);

function updateValue(e) {
    searchValue = e.target.value;
}

function copyToClip() {
let stringToCopy = document.getElementById("koordinatto1").value;

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(stringToCopy);

  /* Alert the copied text */
  alert("Copied the text: " + stringToCopy);
}

function getResults() {
    const e1 = document.getElementById('sel1');
    const e2 = document.getElementById('sel2');
    const sourceproj = e1.options[e1.selectedIndex].title;
    const destproj = e2.options[e2.selectedIndex].title;

    var sourceval1 = document.getElementById('koordinatfrom1').value;
    let sourceval2 = document.getElementById('koordinatfrom2').value;
    let sourceval3 = document.getElementById('koordinatfrom3').value;
    let sourceval4= document.getElementById('koordinatfrom4').value;
    fetch(`${webproj_trans_url + sourceproj + "/" + destproj + "/" + sourceval1 + "," + sourceval2+ "," + sourceval3+ "," + sourceval4 + df_token_string}`)
        .then(data => {
            return data.json();
        }).then(displayResults);
}

function displayResults(data) {
document.getElementById('koordinatto1').value = data["v1"];
document.getElementById('koordinatto2').value = data["v2"];
document.getElementById('koordinatto3').value = data["v3"];
document.getElementById('koordinatto4').value = data["v4"];
}

function getDescription(EPSG) {
    // get info about EPSG code
    const httpRequest = new XMLHttpRequest();
    let result = {};
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                try {
                    result = JSON.parse(httpRequest.responseText);
                } catch (e) {
                    console.error("Parse Error", httpRequest.statusText);
                }
            } else {
                console.error("Response Error", httpRequest.statusText);
            }
        }
    }
    httpRequest.onerror = function () {
        console.error("Request Error");
    };
    httpRequest.open('GET', webproj_info_url + EPSG + df_token_string, false);
    httpRequest.send();
    result = JSON.parse(httpRequest.responseText);
    return result;
}

// Get our data from WEBPROJ

function getData() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function () {
        let description = {};
        let EPSG_codes;
        let regiondict;
        let countrydict;
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                try {
                    // first get the list of EPSG codes
                    EPSG_codes = JSON.parse(httpRequest.responseText);
                    countrydict = {}
                    for (const region of Object.keys(EPSG_codes)) {
                        // iterate over regions
                        regiondict = {}
                        for (const epsgcode of Object.keys(EPSG_codes[region])) {
                            // iterate over projections
                            countrydict = {}
                            description = getDescription(EPSG_codes[region][epsgcode]);
                            description["EPSG"] = EPSG_codes[region][epsgcode]
                            regiondict[epsgcode] = description; // add EPSG plus info to region dictionary
                        }
                        countrydict[region] = regiondict;
                        EPSG_data = Object.assign(EPSG_data, countrydict);
                    }
                } catch (e) {
                    console.error("Parse Error", httpRequest.statusText);
                }
            } else {
                console.error("Response Error", httpRequest.statusText);
            }
        }
    };
    httpRequest.onerror = function () {
        console.error("Request Error");
    };
    httpRequest.open('GET', webproj_srslist_url + df_token_string, false);
    httpRequest.send();
}

function setUpUI() {
    let groupselect1 = document.getElementById('sel1');
    let groupselect2 = document.getElementById('sel2');
    let region;
    let description;
    for (region of Object.keys(EPSG_data)) {
        // iterate over regions
        const opt = document.createElement('option');
        opt.value = region;
        opt.innerHTML = region;
        opt.disabled = true;
        groupselect1.appendChild(opt);
        groupselect2.appendChild(opt.cloneNode(true));
        for (const index of Object.keys(EPSG_data[region])) {
            // iterate over projections
            const opt2 = document.createElement('option');
            opt2.disabled = false;
            description = EPSG_data[region][index]["EPSG"]
            opt2.title = EPSG_data[region][index]["EPSG"];
            opt2.value = EPSG_data[region][index]["EPSG"];
            opt2.innerHTML = EPSG_data[region][index]["title"];
            groupselect1.appendChild(opt2);
            groupselect2.appendChild(opt2.cloneNode(true));
        }

    }
}

function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
}
