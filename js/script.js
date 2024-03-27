window.addEventListener("load", () => {
    setTimeout(()=>{
        getData(page)
        queryId("spinner").classList.add('hidden')
    },1000) 

document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "scape") {
            backToHome();
            queryId("form-createJob").classList.add('hidden');
        }
    });
})

const url_base = 'https://626c364a5267c14d566e8d8a.mockapi.io/';
const endpoint = "jobs"
const queryId = (id) => document.getElementById(id)
let page = 1;
let isEdit = false

const hiddeSpinner=()=> queryId("spinner").classList.add('hidden')
const cleanTable =()=> queryId("cardsContainer").innerHTML ="" 
const main = queryId("main")

const handleSpinner=()=>{
    cleanTable()
    queryId("spinner").classList.remove('hidden')
    queryId("buttonContainer-next-prev").classList.add("hidden")
}

// REQUESTS
const getData = (page) => {
    fetch(`${url_base}${endpoint}?page=${page}&limit=6`)
        .then(response => response.json())
        .then(data => renderJobs(data))
        .catch(err => alert(err))
}

const jobsDetail = (id) => {
    fetch(`${url_base}${endpoint}/${id}`)
    .then(res => res.json())
    .then(res => renderDetails(res))
    .catch(err => alert(err))
} 

const getOnlyCard =(id)=>{
    fetch(`${url_base}${endpoint}/${id}`)
    .then(res => res.json())
    .then(res => cardJob(res))
    .catch(err => alert(err))
}

const sendJob = () => {
    fetch(`${url_base}${endpoint}`,{
        method: "POST",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(sendData())
    })
    .finally(() => ("termine de ejecutar el POST"))
}

const sendEditData = (id) => {
    fetch(`${url_base}${endpoint}/${id}`,{
        method: "PUT",
        headers: {
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(newData())
    })
    .finally(() => {
        queryId("formCreate").classList.add('hidden');
        handleSpinner();
        setTimeout(()=>{
        hiddeSpinner();
        page = 1;
        getData(page)
        },2000)
    })
}


//RENDERS
const renderDetails = (job) => { // renderiza todos los productos que reciba
    const {name, description, location, category, seniority, id} = job
    handleSpinner()
    setTimeout(()=>{
        queryId("buttonContainer-next-prev").classList.add("hidden")
        hiddeSpinner()
        queryId("cardsContainer").innerHTML = `
        <div class="detailCard">
            <img class="imgCardDetails" src="./img/job.png"alt="${name}">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-description"><b>Job's description: </b>${description}</p>
                <p class="card-location"><b>Location: </b>${location}</p>
                <p class="card-category"><b> Category: </b>${category}</p>
                <p class="card-seniority"><b> Seniority: </b>${seniority}</p>
            </div>
            <div class="btn-container-DeletandEdit">
                <button class="deleteJobs" id="button--DeleteJob" onclick="deleteSing(${id})">Delete</button>
                <button class="editJobs" id="button--editJob" onclick="editJob(${id})">Edit</button>
            </div>
            <button class="editJobs" id="button--editJob" onclick="backToHome()">Back</button>
        </div>         
    `
    },2000)
}


const renderJobs = (data) => { // renderiza todos los productos que reciba
    for(const {name, description, location, category, id, seniority} of data){
    queryId("cardsContainer").innerHTML +=`
        <div class="card">
            <img src=""> 
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-description">${description}</p>
                <p class="card-location"><b>Location:<b> ${location}</p>
                <div class="card-cat-sen">
                    <p class="card-category span">${category}</p>
                    <p class="card-seniority span">${seniority}</p>
                </div>
            </div>
        <button class="btnSeeDet" onclick="jobsDetail(${id})">See Details</button>
        </div>         
        `
    }
}

//PERFORM DELETE JOB AND EDIT JOB ALERT
const deleteSing = (id) => {
    cleanTable();
    queryId("cardsContainer").innerHTML = `
    <div class="alertDelete">
        Are you sure you want to delete this item?
        <button class="remove" onclick="deleteJob(${id})">Remove</button>
        <a href="index.html" class="backToInto">Back</a>
    </div>
`
}

//METHODS
const sendData = () => {
    return {
        name: queryId("title").value,
        description: queryId("description").value,
        category: queryId("category").value,
        seniority:queryId("seniority").value,
        location:queryId("location").value
    }
}

const deleteJob = (id) => {
    fetch(`${url_base}${endpoint}/${id}`, {
        method: "DELETE",
    })
    .finally(() => {
        cleanTable();
        queryId("spinner").classList.remove('hidden');
        setTimeout(()=>{
            getData(page)
            hiddeSpinner();
            queryId("buttonContainer-next-prev").classList.remove("hidden")
        },2000)
    })
}

const searchfilter = () => {
    let objfilter = {
        location:queryId("form__select--country").value,
        seniority:queryId("form__select--seniority").value,
        category:queryId("form__select--category").value
    };
    if(objfilter.location !== undefined && objfilter.seniority !== undefined && objfilter.category !== undefined){
        fetch(`${url_base}${endpoint}`)
        .then((res) => res.json())
        .then((data) => {
            const filterData = 
            data.filter(
                ({ location, seniority, category }) =>
                    location === objfilter.location ||
                    seniority === objfilter.seniority ||
                    category === objfilter.category
            );
            if(filterData.length > 1){
                renderJobs(filterData) 
                }else{
                    queryId("cardsContainer").innerHTML=`
                    <div class="alertEmpty">
                    <h3>Ups! Your search returned no results</h3>
                    <a href="index.html" class="back">Back</a>
                    </div>`
                    queryId("buttonContainer-next-prev").classList.add('hidden')
                }
            })
        .catch((err) => (err));
    }
};

const newData = () => {
    return {
        name: queryId("editTitle").value,
        category: queryId("editCategory").value,
        location: queryId("editLocation").value,
        description: queryId("editDescription").value,
        seniority: queryId("editSeniority").value
    }
}

const cardJob = (job) =>{
    const {category, name, description, seniority,location} = job
        queryId("editTitle").value = name
        queryId("editDescription").value = description
        queryId("editLocation").value = location
        queryId("editCategory").value = category
        queryId("editSeniority").value = seniority
}


const editJob=(id)=>{
    getOnlyCard(id)
    queryId("formCreate").classList.remove('hidden');
    main.style.flexDirection='row'
    isEdit = true
    addEvent(id)
}

//EVENTS
const backToHome =()=>{
    queryId("formCreate").classList.add('hidden');
    handleSpinner()
    setTimeout(()=>{
        queryId("buttonContainer-next-prev").classList.remove("hidden");
        hiddeSpinner();
        page =1;
        getData(page)
    },2000)
}

const addEvent=(id)=>{
    queryId("send-edit-job").addEventListener("click", (e) => {
        e.preventDefault()
        if (isEdit) {
            sendEditData(id)
        }
    })
}
queryId("form-back").addEventListener('click',()=>{
    queryId("form-createJob").classList.add("hidden");
    backToHome();
})

queryId("for--cancel-createJob").addEventListener('click',()=>{
    backToHome();
})

queryId("form-submit").addEventListener("click",(e)=>{
    e.preventDefault();
    sendJob();
    queryId("form-createJob").classList.add('hidden');
    handleSpinner();
    backToHome();
    queryId("buttonContainer-next-prev").classList.remove("hidden");
})

queryId("form__search--Btn").addEventListener("click", (e) => {
    e.preventDefault();
    handleSpinner();
    queryId("form-createJob").classList.add('hidden');
    queryId("formCreate").classList.add('hidden');
    setTimeout(()=>{
        hiddeSpinner();
        searchfilter();
    },2000)
});

queryId("form__clean--Btn").addEventListener("click",()=>{
    queryId("form__select--country").value = "Chosse a country";
    queryId("form__select--seniority").value = "Chosse a seniority";
    queryId("form__select--category").value ="Chosse a category";
    handleSpinner();
    queryId("form-createJob").classList.add('hidden');
    queryId("formCreate").classList.add('hidden');
    setTimeout(()=>{
        hiddeSpinner();
        getData(page);
    },1000) 
})

//funcionalidades en el boton prev y next
queryId("buttonNext").addEventListener('click',()=>{
    queryId("cardsContainer").innerHTML =""
    page++
    getData(page)
})

queryId("buttonPrev").addEventListener('click',()=>{
    if (page >1){
    queryId("cardsContainer").innerHTML =""
    page--
    getData(page)}
})

//navbar buttons
queryId("navbar--createJob").addEventListener('click',()=>{
    handleSpinner()
    queryId("formCreate").classList.add('hidden');
    setTimeout(()=>{
    queryId("spinner").classList.add('hidden')
    queryId("buttonContainer-next-prev").classList.add('hidden')
    queryId("form-createJob").classList.remove('hidden')
    },2000)
})

const btnCareer = queryId("navbar--careers").addEventListener('click',()=>{
    cleanTable();
    handleSpinner();
    queryId("form-createJob").classList.add('hidden');
    queryId("formCreate").classList.add('hidden');
    setTimeout(()=>{
        getData(page);
        hiddeSpinner();
        queryId("buttonContainer-next-prev").classList.remove('hidden')
    },1000)
})

const btn = document.querySelector(".btn-toggle");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});
