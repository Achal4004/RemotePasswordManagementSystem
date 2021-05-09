let email=document.getElementById("email");
let password=document.getElementById("password");
let welcomeCard=document.querySelector('.welcome-card');
let normalCard=document.querySelector('.normal-card');
let formCard=document.querySelector('.form-card');

var notifOption= {
    type:'basic',
    iconUrl:'./img/logo48.png',
    title:'RPMS Extension 0.1',
    message:""
}
document.getElementById('button-1').addEventListener('click',(event)=>{
    normalCard.classList.add("hide");
    formCard.classList.remove("hide");
    welcomeCard.classList.add('hide');
});
document.getElementById('button-2').addEventListener('click',(event)=>{
    normalCard.classList.add("hide");
    formCard.classList.remove("hide");
    welcomeCard.classList.add('hide');
});
document.getElementById('configuration-form').addEventListener('submit',(event)=>{
    if(email.value!="" && password.value!=""){
        chrome.storage.local.set({"email":email.value,"password":password.value},()=>{
        })
        notifOption.message="Configuration done sucessfully."
        chrome.notifications.create("configuration",notifOption);
    }else {
        notifOption.message="Configuration failed because fields are Empty."
        chrome.notifications.create("configuration",notifOption);
    }
    
})
chrome.storage.local.get(["email","password"],(result)=>{
    if(result.email==undefined||result.password==undefined||result.email=="" || result.password=="") {
        normalCard.classList.add("hide");
        formCard.classList.add("hide");
        welcomeCard.classList.remove('hide');
    }
    else {
        document.getElementById("show-email").innerText=result.email;
        document.getElementById("show-password").innerText="••••••• "+result.password.slice(-3);
        normalCard.classList.remove("hide");
        formCard.classList.add("hide");
        welcomeCard.classList.add('hide');
    }
    
});
