let streamApi = 'https://wind-bow.glitch.me/twitch-api/streams/';
let twitchUsers = ['ESL_SC2', 'OgamingSC2', 'freecodecamp', 'noobs2ninjas', 'comster404'];
let streamByUser = [];

window.onload = function() {

    //Make a API request for each user and store in an array
    twitchUsers.map((user) => {
        fetch(streamApi + user, {method: 'GET'})
        .then(response => response.json())
        .then(json => {
            streamByUser.push(json);
            let uL = document.getElementById("user-list");        
            let listItem = document.createElement("li");
            listItem.className = "list-group-item";
            if (json.stream === null) {
                listItem.innerHTML = "null";
            } else {
                listItem.innerHTML = json.stream.channel.display_name;
            }
            uL.appendChild(listItem);   
        });
    });

    console.log(streamByUser);
};