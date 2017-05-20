const streamApi = 'https://wind-bow.glitch.me/twitch-api/streams/';
const userApi = 'https://wind-bow.glitch.me/twitch-api/users/';
const twitchUsers = ['ESL_SC2', 'OgamingSC2', 'freecodecamp', 'noobs2ninjas', 'comster404'];

//Run through GET request for each user and store returned object in Array
let streamByUser = twitchUsers.map((user) => {
    return fetch(`${streamApi}${user}`, {method: 'GET'})
    .then(response => response.json())
});

let userInfo = twitchUsers.map((user) => {
    return fetch(userApi);
});

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
        if (user.stream === null) {
            listItem.innerHTML = 'Currently no stream';
        } else {
            let userLogoDiv = document.createElement("div");
            let userNameDiv = document.createElement("div");
            userLogoDiv.className = "user-logo";
            userLogoDiv.innerHTML = `<img src=${user.stream.channel.logo} />`;
            listItem.appendChild(userLogoDiv);
        }
        uL.appendChild(listItem);
    };
};


  
