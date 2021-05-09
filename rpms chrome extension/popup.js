let password = document.getElementById("password");
let username=document.getElementById("username");
let website=document.getElementById("website");

document.getElementById("close-window").addEventListener('click',()=>{window.close();});
document.querySelector("form").addEventListener("submit",submitForm);
document.getElementById("visibility-toggler").addEventListener("click",  tooglePasswordVisibility);

function submitForm(event) {
    event.preventDefault();
    chrome.runtime.sendMessage({
        msg: "sendRequest", 
        data: {

                website:website.value,
                username:username.value,
                password:password.value
            }
    });
    website.value="";
    password.value="";
    username.value="";
}
function tooglePasswordVisibility(event) { 
    if (password.type === "password") {
      password.type = "text";
      event.target.src="./img/eye-slash.png";
      event.target.style.height="16px";
      event.target.style.bottom="120px";
    } else {
      password.type = "password";
      event.target.src="./img/eye.png";
      event.target.style.height="10px";
      event.target.style.bottom="123px";
    }
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "autofill") {
            website.value=request.data.website;
            username.value=request.data.username;
            password.value=request.data.password;
            console.log(request.data);
        }
        if(request.msg ==="notification") {
            console.log(request.data.notifOption);
            chrome.notifications.create("apinotif",request.data.notifOption);
        }
    }
);
function findCredential() {
  let username=null;
  let password=null;
  let input_fields=document.querySelectorAll("input");
  for(let i=1; i<input_fields.length;i++) {
      console.log(input_fields[i].type);
      console.log(input_fields[i-1].type);
      if(input_fields[i].type=="password") {
          if(password==null) {
              if(input_fields[i-1].type=='email' || input_fields[i-1].type=="text") {
                  username=input_fields[i-1].value;
                  password=input_fields[i].value;
              }
          }
          else {
              username=null;
              password=null;
              flag=true;
              break;
          }
      } 
  }
  if(username!=null) {
    console.log(username+" "+password);
    chrome.runtime.sendMessage({
        msg: "autofill", 
        data: {
            website:window.location.hostname,
            username: username,
            password: password,
        }
    });
  }
}
chrome.tabs.query({ currentWindow: true, active: true },function (tabArray) { 
    if(new URL(tabArray[0].url).protocol!="chrome:"&&new URL(tabArray[0].url).protocol!="chrome-extension:") {
        chrome.scripting.executeScript({
            target: { tabId: tabArray[0].id },
            function: findCredential
        });
    }
});