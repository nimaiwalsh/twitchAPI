const streamApi = 'https://wind-bow.glitch.me/twitch-api/streams/';
const userApi = 'https://wind-bow.glitch.me/twitch-api/users/';
const twitchUsers = ['ESL_SC2', 'OgamingSC2', 'freecodecamp', 'noobs2ninjas', 'comster404'];
//Check if user is streaming and store sreaming object else store user details object
let streamByUser = twitchUsers.map((user) => {
    return fetch(`${streamApi}${user}`, {method: 'GET'})
    .then(response => response.json())
    .then((json) => {
        if(!json.stream) {
            return fetch(`${userApi}${user}`, {method: 'GET'})
            .then(response => response.json())
            .then(userAccount => userAccount)
        } 
            return json;
    })
});

window.onload = function() {
    //Wait until the fetch requests are complete then process the data
    Promise
        .all(streamByUser)
        .then((userStream) => {
            userStream.map((user) => {
                if (user.name) {
                    buildList(user.logo, user.name, 'User offline');
                } else if (user.error) {
                    buildList(user, user.error, user.message);
                } else {
                    buildList(user.stream.channel.logo, user.stream.channel.display_name, `${user.stream.channel.game} : ${user.stream.channel.status}`)
                }
            });
        });   

    function buildList(logo, username, stream) {
        let uL = document.getElementById("user-list");        
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `
            <div class="container">
            <div class="row">
                <div class="col-sm-4 logo-div">
                    <img src=${logo} />
                </div>
                <div class="col-sm-8">
                    <div class="row">
                        <div class="col-sm-12 user-name-div">
                            <p>${username}</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 stream-div">
                            <p>${stream}</p>
                        </div>
                    </div>
                </div>                
            </div>
            </div>
        `
        uL.appendChild(listItem);
    }
};


  
