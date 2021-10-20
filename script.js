const webproj_srslist_url = "https://api.dataforsyningen.dk/rest/webproj/v1.0/crs/";
const webproj_info_url = "https://api.dataforsyningen.dk/rest/webproj/v1.0/crs/";
const webproj_trans_url = "https://api.dataforsyningen.dk/rest/webproj/v1.0/trans/"; // add {src}/{dst}/{v1}/{v2} at the end
const df_token_string = "?token=d2460098015969ae9229d18233f05a60"

let EPSG_data; // our database of projections and metadata

// for selecting different controls
const search = document.querySelector(".searchBox");
const convert = document.querySelector(".convert");
const fromSRS = document.querySelector(".from");
const toSRS = document.querySelector(".to");
let resultFrom;
let resultTo;
let searchValue;

document.getElementById("bigheading").innerHTML = "Please wait - loading data...";
getData();
setUpUI();
document.getElementById("bigheading").innerHTML = "Coordinate transformation";

// Event when fromSRS is changed
fromSRS.addEventListener('change', (event) => {
    resultFrom = `${event.target.value}`;
    document.getElementById('convert').disabled = !bothSRSselected();
});

// Event when toSRS is changed
toSRS.addEventListener('change', (event) => {
    resultTo = `${event.target.value}`;
    document.getElementById('convert').disabled = !bothSRSselected();
});

function bothSRSselected() {
    const e1 = document.getElementById('sel1');
    const e2 = document.getElementById('sel2');
    const e1_txt = e1.options[e1.selectedIndex].title; // title holds EPSG code
    const e2_txt = e2.options[e2.selectedIndex].title;

    return e1_txt.includes("EPSG:") && e2_txt.includes("EPSG:");
}

search.addEventListener('input', updateValue);

convert.addEventListener("click", getResults);

function updateValue(e) {
    searchValue = e.target.value;
}

function getResults() {
    fetch(`${webproj_trans_url + df_token_string}`)
        .then(data => {
            return data.json();
        }).then(displayResults);
}

function displayResults(data) {
    // TBD
}

function getDescription(EPSG) {
    return fetch(webproj_info_url + EPSG + df_token_string)
        .then(response => response.json())
        .catch((e) => {
        });
}

// Get our data, process EPSG codes and populate the dropdowns with codes
// and put descriptions into tooltips
// To have UI setup moved out

function getData() {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = async function () {
        let groupselect1 = document.getElementById('sel1');
        let groupselect2 = document.getElementById('sel2');
        let description;
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                try {
                    // first get the list of EPSG codes
                    EPSG_data = JSON.parse(httpRequest.responseText);
                    console.log(EPSG_data);
                    for (const region of Object.keys(EPSG_data)) {
                        // iterate over regions
                        const opt = document.createElement('option');
                        opt.value = region;
                        opt.innerHTML = region;
                        opt.disabled = true;
                        groupselect1.appendChild(opt);
                        groupselect2.appendChild(opt.cloneNode(true));
                        for (const epsgcode of Object.keys(EPSG_data[region])) {
                            // iterate over projections
                            const opt2 = document.createElement('option');
                            opt2.disabled = false;
                            description = await getDescription(EPSG_data[region][epsgcode]);
                            opt2.title = EPSG_data[region][epsgcode];
                            opt2.value = EPSG_data[region][epsgcode];
                            opt2.innerHTML = description["title"];
                            groupselect1.appendChild(opt2);
                            groupselect2.appendChild(opt2.cloneNode(true));
                        }
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
    httpRequest.open('GET', webproj_srslist_url + df_token_string);
    httpRequest.send();
}



function clearVal() {
    window.location.reload();
    document.getElementsByClassName("finalValue").innerHTML = "";
}
