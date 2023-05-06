let openForm = document.getElementById("NavAdd") as HTMLButtonElement
let formInput = document.getElementById("DisplayForm") as HTMLFormElement

const displayDetails = document.getElementById("DisplayDetails") as HTMLElement

let contact = document.querySelector("#ContactSection")

var selectedDiv;

var resetForm = document.getElementById("ContactForm") as HTMLFormElement

openForm.addEventListener("click", formDisplayNone) 

function formDisplayNone(){
    if (formInput.style.display == "none") {
        formInput.style.display = "block" 
        displayDetails.style.display = "none"
    }else{
        formInput.style.display = "none"
    }
    event.preventDefault()
    resetForm.reset()
};

let nameValidation = document.getElementById("InputName") as HTMLInputElement
nameValidation.addEventListener("keyup", validateName)

function validateName(){
    var name = (document.getElementById("InputName") as HTMLInputElement).value;
    console.log(name)
    if(name.length == 0){
     document.getElementById("NameError").innerHTML = "Name is required";
    }
    else{
       document.getElementById("NameError").innerHTML = " ";
    }
}

let emailValidation = document.getElementById("InputEmail") as HTMLInputElement
emailValidation.addEventListener("keyup", validateEmail)

function validateEmail(){

    var email = (document.getElementById("InputEmail") as HTMLInputElement).value ;
    let regex = /^([a-zA-Z0-9\.-]+)@([a-z0-9-]+)\.([a-z\.]{3,10})$/;
 
 
    if(email.length == 0){
       document.getElementById("EmailError").innerHTML = "Email is required";
      }else if(!email.match(regex)){
       document.getElementById("EmailError").innerHTML = "Enter a valid Email";
      }else{
       document.getElementById("EmailError").innerHTML = " ";
    }

}

let mobileValidation = document.getElementById("InputMobile") as HTMLInputElement
mobileValidation.addEventListener("keyup", validateMobile)

function validateMobile(){
    var mobile = (document.getElementById("InputMobile") as HTMLInputElement).value
    let regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;

    if(mobile.length == 0){
        document.getElementById("MobileError").innerHTML = "Mobile number is required";
       }else if(!mobile.match(regex)){
        document.getElementById("MobileError").innerHTML = "Enter a valid number";
       }else{
        document.getElementById("MobileError").innerHTML = " ";
     }
}

class FormDetails {
    name: string
    email:string
    mobile:string
    landline:string
    website:string
    address:string
    constructor(args: any) {
        this.name = args.name 
        this.email = args.email 
        this.mobile = args.mobile 
        this.website = args.website
        this.landline = args.landline
        this.address = args.address
    }
}

let Users: FormDetails[]


let userName = document.getElementById("InputName") as HTMLInputElement
let userEmail = document.getElementById("InputEmail") as HTMLInputElement
let userMobile = document.getElementById("InputMobile") as HTMLInputElement
let userLandline = document.getElementById("InputLandline") as HTMLInputElement
let userWebsite = document.getElementById("InputWebsite") as HTMLInputElement
let userAddress = document.getElementById("InputAddress") as HTMLInputElement

Users = [{
    name: userName.value, 
    email: userEmail.value, 
    mobile: userMobile.value, 
    landline: userLandline.value, 
    website: userWebsite.value, 
    address: userAddress.value
}]

let saveDetails = document.querySelector(".add-btn") as HTMLButtonElement
saveDetails?.addEventListener("click", addDetails)

function addDetails(){

    const createDiv = document.createElement("div")
    createDiv.className = 'contact-details'

    var newUser = new FormDetails({
        name: userName.value, 
        email: userEmail.value, 
        mobile: userMobile.value, 
        landline: userLandline.value, 
        website: userWebsite.value, 
        address: userAddress.value
    })

    var textName = document.createElement("div")
    var textEmail = document.createElement("div")
    var textMobile = document.createElement("div")

    textName.innerHTML = userName.value
    textEmail.innerHTML = userEmail.value
    textMobile.innerHTML = userMobile.value
    textName.id = 'FillName'
    textEmail.id = 'FillEmail'
    textMobile.id = 'FillMobile'
    createDiv.appendChild(textName)
    createDiv.appendChild(textEmail)
    createDiv.appendChild(textMobile)

    contact.appendChild(createDiv)

    Users.push(newUser)



    var lengthText = 30;
    var truncateText = textName.innerHTML;
    
    if (truncateText.length > lengthText){
        var shortText = truncateText.substring(0,lengthText).split(" ").slice(0, -1).join(" ") + ' <a href="#">...</a>';
        textName.innerHTML = shortText;
        var hoverText = textName as HTMLDivElement
        hoverText.addEventListener("mouseenter", function(){
            textName.innerHTML = truncateText
        })
        hoverText.addEventListener("mouseleave",  function(){
            textName.innerHTML = shortText
        })
    }

    var contactList = document.getElementsByClassName('contact-details') as HTMLCollectionOf<HTMLElement>
    for(let i = 0; i < contactList.length; i++){
        contactList[i].style.backgroundColor = "white"
        displayDetails.style.display = "block"
    }


    createDiv.style.backgroundColor = "rgb(206, 231, 242)"
    displayUserDetails(newUser)


    createDiv?.addEventListener("click", function(){

        
        var contactListItem: any = contact.children 

        selectedDiv = createDiv  
        for(let i = 0; i < contactListItem.length; i++){

            contactListItem[i].style.backgroundColor = "white" 
        }
        if (selectedDiv.style.backgroundColor == "white") {
            selectedDiv.style.backgroundColor = "rgb(206, 231, 242)"
        }
        
        if(formInput.style.display == 'block'){
            formInput.style.display = 'none';
        }

        if(displayDetails.style.display == "none"){
            displayDetails.style.display = "block"
        }
        else{
            displayDetails.style.display = "block"
        }

        displayUserDetails(newUser)

    });
    formInput.style.display = "none";



    function displayUserDetails(user: FormDetails){

        if(!(document.querySelector('#DisplayDetails'))){
            var displayDetails = document.createElement('div')
            displayDetails.id = "DisplayDetails"

        }
        else{
            displayDetails = document.querySelector('#DisplayDetails')
        }



        displayDetails.id = "DisplayDetails";
        document.getElementById('PageContainer').appendChild(displayDetails)

        if(!(document.querySelector('.page-heading'))){
            var displayName = document.createElement("h2")
            displayName.className = "page-heading"
        }
        else{
            displayName = document.querySelector('.page-heading')
        }
            displayName.innerHTML = user.name;
            displayDetails.appendChild(displayName)

            let edit = document.createElement("img")
            edit.className = 'edit-img'
            edit.src = "edit1.jpg"
            displayName.appendChild(edit)

            let editText = document.createElement("span")
            editText.innerHTML = "EDIT"
            editText.className = "edit-text"
            displayName.appendChild(editText)

            let deleteImg = document.createElement("img");
            deleteImg.className = 'delete-img'
            deleteImg.src = "delete2.png"
            displayName.appendChild(deleteImg)

            let deleteText = document.createElement("span")
            deleteText.innerHTML = "DELETE"
            deleteText.className = "delete-text"
            displayName.appendChild(deleteText)
            
        if(!(document.querySelector(".email-text"))){
                var displayEmail = document.createElement("p") as HTMLParagraphElement
                displayEmail.className = "email-text"

        }else{
                displayEmail = document.querySelector('.email-text')
        }
                displayEmail.innerHTML = "Email:"+user.email
                displayEmail.className = "email-text"
                displayDetails.appendChild(displayEmail)

        if(!(document.querySelector("#MobileText"))){
                var displayMobile = document.createElement("p") as HTMLParagraphElement
                displayMobile.id = "MobileText"

        }else{
                displayMobile = document.querySelector('#MobileText')
        }
                displayMobile.innerHTML = "Mobile:" +user.mobile
                displayDetails.appendChild(displayMobile)

        if(!(document.querySelector("#LandlineText"))){
                var displayLandline = document.createElement("p") as HTMLParagraphElement
                displayLandline.id = "LandlineText"
        }else{
                displayLandline = document.querySelector("#LandlineText")
        }
                displayLandline.innerHTML = "Landline:" +user.landline
                displayDetails.appendChild(displayLandline)

        if(!(document.querySelector("#WebsiteText"))){
                var displayWebsite = document.createElement("p") as HTMLParagraphElement
                displayWebsite.id = "WebsiteText"
        }else{
                displayWebsite = document.querySelector("#WebsiteText")
        }
                displayWebsite.innerHTML = "Website:" +user.website
                displayDetails.appendChild(displayWebsite)

        if(!(document.querySelector("#AddressText"))){
                var displayAddress = document.createElement("p") as HTMLParagraphElement
                displayAddress.id = "AddressText"
        }else{
                displayAddress = document.querySelector("#AddressText")
        }

        displayAddress.innerHTML = "Address:" + user.address
        displayDetails.appendChild(displayAddress)

        if(displayDetails.style.display == "none"){
            displayDetails.style.display = "block"
        }
        else{
            displayDetails.style.display = "block"
        }



        displayName.style.fontWeight = "600"


        const deleteUserDetails = document.querySelector(".delete-text") as HTMLInputElement
        deleteUserDetails?.addEventListener("click", deleteContact)
        function deleteContact(){
            displayDetails.parentNode.removeChild(displayDetails)
            createDiv.parentNode.removeChild(createDiv)


            var selectLastContact = contact.lastElementChild as HTMLDivElement;
            selectLastContact.style.backgroundColor = 'rgb(206, 231, 242)';

            displayUserDetails(Users[(Users.length-1)-1])
            displayDetails.style.display = "block"

        }
        

        const editUserDetails = document.querySelector(".edit-text") as HTMLButtonElement
        editUserDetails?.addEventListener("click", function(){

        if (formInput.style.display == "none") {
            formInput.style.display = "block" ;
            
            if(displayDetails.style.display == "block"){
                displayDetails.style.display = "none"
            }else{
                displayDetails.style.display = "none"
            }

        }else{
            formInput.style.display = "none"

        }


        let editForm = document.querySelector(".add-btn") as HTMLButtonElement
        editForm?.addEventListener("click", editContact)
        
        function editContact(){

            textName.innerHTML = userName.value
            textEmail.innerHTML = userEmail.value
            textMobile.innerHTML = userMobile.value

            createDiv.style.display = "none"
            formInput.style.display = "none"

            displayDetails.style.display = "block"

            displayName.innerHTML = userName.value
            displayEmail.innerHTML = "Email:" + userEmail.value;
            displayMobile.innerHTML = "Mobile:" + userMobile.value;
            displayLandline.innerHTML = "Landline:" +  userLandline.value;
            displayWebsite.innerHTML = "Website:" + userWebsite.value;
            displayAddress.innerHTML = "Address:" + userAddress.value;

            edit.className = 'edit-img'
            edit.src = "edit1.jpg"
            displayName.appendChild(edit)

            editText.innerHTML = "EDIT"
            editText.className = "edit-text"
            displayName.appendChild(editText)
                
            deleteImg.className = 'delete-img'
            deleteImg.src = "delete2.png"
            displayName.appendChild(deleteImg)

            deleteText.innerHTML = "DELETE"
            deleteText.className = "delete-text"
            displayName.appendChild(deleteText)

        }    
    })  

    }    

}

        


    
