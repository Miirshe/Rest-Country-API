let middleContainer = document.querySelector('.middle-container');
let btnsearch = document.querySelector("#search");
const subContainer = document.querySelector(".sub-container");
const searchContainer = document.querySelector(".search-container");
const icons = document.querySelector("#icons");
const backto = document.querySelector('.back');
const ModalCountry = document.querySelector('.ModalCountry');
const mainContainer = document.querySelector('.main-container');
icons.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        icons.src = "DarkIcons/sun.png"
    } else {
        icons.src = "DarkIcons/moon.png"
    }
})
async function loadData() {
    const url = "https://restcountries.com/v3.1/all";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    getData(data);
}
const dropDown = document.querySelector('.drop-down');
const drop = document.querySelector('.drop');
dropDown.addEventListener('click', () => {
    drop.classList.toggle("Showdrop");
})
backto.addEventListener("click", () => {
    ModalCountry.classList.toggle("showCountry");
    mainContainer.classList.remove("ShowContainer");

});
function showdata(element) {
    ModalCountry.classList.toggle("showCountry");
    const EngCj = `
    <div class="modal">
            <div class="leftModal">
                <img src="${element.flags.png}" alt="" width="250px">
            </div>
            <div class="rightModal">
                <div class="innerLeft">
                    <h1>${element.name.common}</h1>
                    <p><strong>NativeName : ${ element.name.common}</strong></p>
                    <p><strong>Population : ${element.population}</strong></p>
                    <p><strong>Region : ${element.region}</strong></p>
                    <p><strong>Sub-Region : ${element.subregion} </strong></p>
                </div>
                <div class="innerRight">
                    <p><strong>Capital :${element.capital} </strong></p>
                    <p><strong>Top Level Domain : ${element.tld} </strong></p>
                    <p><strong>Country Area : ${element.area}</strong></p>
                    <p><strong>Continents: ${element.continents} </strong></p>
                </div>
            </div>
        </div>
    `
    const subModal = document.querySelector(".subModal");
    subModal.innerHTML = EngCj;
}
loadData();

function getData(data) {
    data.forEach(element => {
        const { name, capital, flags, area, region, population , subregion ,
            languages , landlocked , currencies ,independent , nativeName } = element;
        const Allcountry = document.createElement("div");
        Allcountry.classList.add('card')
        Allcountry.innerHTML = `
        <div class="card-img">
        <img src=${flags.png} alt="">
    </div>
    <div class="card-body">
        <ul class="group-items">
            <li class="list-items country-name"><strong>Name  : ${element.name.common}</strong></li>
            <li class="list-items"><strong>Capital : ${capital}</strong></li>
            <li class="list-items"><strong>Area : ${area} </strong></li>
            <li class="list-items Region-name"><strong>Region : ${region}</strong></li>
            <li class="list-items"><strong>Population : ${population}</strong></li>
        </ul>
    </div>
    `
        middleContainer.appendChild(Allcountry);
        Allcountry.addEventListener("click",()=>{
            mainContainer.classList.add("ShowContainer");
            showdata(element);
        })
        // const cards = document.querySelectorAll(".card");
        // Array.from(cards).forEach(Carditem=>{
        //     Carditem.addEventListener('click', ()=>{
        //         mainContainer.classList.add("ShowContainer");
        //         showdata(data);
        //     })
        // })
        btnsearch.addEventListener("input", Countrysearch)
        function Countrysearch() {
            const countryName = document.querySelectorAll(".country-name")
            Array.from(countryName).forEach(function (items) {
                const txt = btnsearch.value.toLowerCase();
                const item = items.innerText.toLowerCase();
                if (item.includes(txt)) {
                    items.parentElement.parentElement.parentElement.style.display = "block";
                } else {
                    items.parentElement.parentElement.parentElement.style.display = "none";
                }
            })

        }

        const regions = document.querySelectorAll(".regions");
        const RegionName = document.querySelectorAll(".Region-name");
        regions.forEach(function (element) {
            element.addEventListener("click", () => {
                Array.from(RegionName).forEach(ele => {
                    if (ele.innerText.includes(element.innerText) || element.innerText == "All") {
                        ele.parentElement.parentElement.parentElement.style.display = "block";
                    } else {
                        ele.parentElement.parentElement.parentElement.style.display = "none";
                    }
                })
            })
        })
    });

}