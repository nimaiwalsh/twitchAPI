const streamApi = 'https://wind-bow.glitch.me/twitch-api/streams/';
const userApi = 'https://wind-bow.glitch.me/twitch-api/users/';
const twitchUsers = ['ESL_SC2', 'OgamingSC2', 'freecodecamp', 'noobs2ninjas', 'comster404'];
//Find offline users and store in offLineUser array, else return the Stream Object
let streamByUser = twitchUsers.map((user) => {
    return fetch(`${streamApi}${user}`, {method: 'GET'})
    .then(response => response.json())
    .then((json) => {
        if(json.stream === null) {
            return fetch(`${userApi}${user}`, {method: 'GET'})
            .then(response => response.json())
            .then(offLineUser => offLineUser)
        } else {
            return json;
        }
    })
});
console.log(streamByUser);

window.onload = function() {
    //Wait until the fetch requests are complete then process the data
    Promise
        .all(streamByUser)
        .then((userStream) => {
            userStream.map(user => buildList(user));
        });

    function buildList(user) {
        let uL = document.getElementById("user-list");        
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        if (!user.stream) {
            listItem.innerHTML = 'Not online';
        } else {
        let userLogoDiv = document.createElement("div");
        userLogoDiv.className = "user-logo";
        userLogoDiv.innerHTML = `<img src=${user.stream.channel.logo} />`;
        listItem.appendChild(userLogoDiv);
        }
        uL.appendChild(listItem);
    }
};


  
