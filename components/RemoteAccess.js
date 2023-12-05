const URI = 'http://172.232.171.163:4567';

async function loadPosts() {
    const response = await fetch(URI + '/userPost/all', {headers: {'Content-Type': 'application/json'}});
    return response.json();
}

async function loadPost(postID) {
    const response = await fetch(URI + '/userPost/' + postID, {headers: {'Content-Type': 'application/json'}});
    return response.json();
}

async function loadPostsByUser(username) {
    let params = 'username=' + username;
    params = params.replace(/\s/, '+');
    const response = await fetch(URI + '/userPost?' + params);
    return await response.json();
}

async function savePost(username, routeID, comment) {
    let params = 'username=' + username + '&routeID=' + routeID + '&comment=' + comment;
    params = params.replace(/\s/, '+');
    return await fetch(URI + '/userPost?' + params, {method: 'POST'});
}


async function loadRoute(routeID) {
    const response = await fetch(URI + '/route/' + routeID);
    return await response.json();
}

async function loadRoutesByUser(username){
    const posts = await loadPostsByUser(username);
    let routes = [];
    for (let i = 0; i < posts.length; i++) {
        routes.push(await loadRoute(posts[i].routeID));
    }
    return routes;
}

async function saveRoute(name, points) {
    let params = 'name=' + name + '&points=' + JSON.stringify(points);
    params = params.replace(/\s/, '+');
    return await fetch(URI + '/route?' + params, {method: 'POST'});
}

export {loadPost};
export {loadPosts};
export {loadPostsByUser};
export {savePost};
export {loadRoute};
export {loadRoutesByUser};
export {saveRoute};
