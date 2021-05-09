var notifOption= {
    type:'basic',
    iconUrl:'./img/logo48.png',
    title:'RPMS Extension',
    message:""
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.storage.local.get(["email","password"],(result)=>{
            if (request.msg === "sendRequest") {
                fetch("http://localhost:3000/api/addPassword", {
                    method: "POST",
                    body: JSON.stringify({email:result.email,password:result.password,data:request.data}),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                .then((response) => response.json())
                .then((json) => {
                    notifOption.message=json.message;
                    chrome.runtime.sendMessage({
                        msg: "notification", 
                        data: {
                            notifOption:notifOption
                        }
                    });
                })
                .catch((err)=>{
                    console.log(err);
                    notifOption.message="Error: Passowrd can't uploaded";
                    chrome.runtime.sendMessage({
                        msg: "notification", 
                        data: {
                            notifOption:notifOption
                        }
                    });
                });
            }
            
        });
        
    }
);