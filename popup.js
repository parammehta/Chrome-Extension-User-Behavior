// function cookieinfo(){
//     chrome.cookies.getAll({},function (cookie){
//         console.log(cookie.length);
//         allCookieInfo = "";
//         for(i=0;i<cookie.length;i++){
//             console.log(JSON.stringify(cookie[i]));

//             allCookieInfo = allCookieInfo + JSON.stringify(cookie[i]);
//         }
//         localStorage.allCookieInfo = allCookieInfo;
//     });
// }
// window.onload=cookieinfo;

//GET REQUEST TO SERVER FOR LOGGEDIN USER INFO
var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (request.readyState === 4) {
        if (request.status === 200 || request.status === 404) {
            document.getElementById("para").innerHTML = "User: " + request.responseText;
        } else {
            document.getElementById("para").innerHTML = "Server Error";
        }
    }
};
request.open("GET", 'http://localhost:8000/loggedIn' , true);
request.send(null);