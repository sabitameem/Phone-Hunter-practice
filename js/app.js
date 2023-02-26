 const loadPhone=async(searchText,datalimit)=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res =await fetch(url);
    const data = await res.json();
    displayPhone(data.data,datalimit);
}
const displayPhone =(phones,datalimit) =>{
     const phonesContainer = document.getElementById('phone-container');
     phonesContainer.textContent ='';
     //display 10 phones only
     const showAll = document.getElementById('show-all');
     if(datalimit && phones.length >10){
        phones= phones.slice(0,10);
        showAll.classList.remove('d-none');
     }
     else{
        showAll.classList.add('d-none');
     }
    
      //display no phone
      const noPhone = document.getElementById('no-phone-text');
      if(phones.length === 0){
        noPhone.classList.remove('d-none');
      }
      else{
        noPhone.classList.add('d-none');
      }

     //display all phones
     phones.forEach(phone =>{
        const phoneDiv =document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="card h-100 p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <button onclick="loadPhonesDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">Show Details</button>
        </div>
      </div>
        `;
      
        phonesContainer.appendChild(phoneDiv);  
     })
     //stop loader
     toggleSpinner(false);
}
const processSearch =(datalimit)=>{
    toggleSpinner(true);
            const searchField = document.getElementById('search-field');
            const searchText = searchField.value;
            loadPhone(searchText,datalimit);
}


document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    processSearch(10)
});
//search input field enter button
document.getElementById('search-field').addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            processSearch(10);
        }
})

 const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
 }

 //not the est way
 document.getElementById('btn-show-all').addEventListener('click',function(){
    processSearch();
 })

 const loadPhonesDetails =async id =>{
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res =await fetch(url);
    const data =await res.json();
    phoneModalDetails(data.data);

 }
 const phoneModalDetails = phone =>{
     console.log(phone);
     const modalTitle = document.getElementById('phoneModallLabel');
     modalTitle.innerText =phone.name;
     const phoneDetails = document.getElementById('phone-details');
     phoneDetails.innerHTML =`
       <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'no release date found'}</p>
       <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
       <p>Storage: ${phone.mainFeatures.storage}</p> 
     `;
     
 }
//loadPhone('apple');