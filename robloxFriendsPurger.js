let friends = 0;
let removed = 0;
let csrf_token = '';
let userId = '';

fetch('https://www.roblox.com/my/account/json', { credentials: 'include' })
    .then(response => response.json())
    .then(data => {
        userId = data['UserId'];
        
        fetch('https://friends.roblox.com/v1/my/friends/count', { credentials: 'include' })
            .then(response => response.json())
            .then(data => {
                friends = data['count'];
                
                fetch('https://auth.roblox.com/v2/login', { method: 'POST', credentials: 'include' })
                    .then(response => {
                        csrf_token = response.headers.get('x-csrf-token');
                        if (friends >= 1) {
                            console.log(`[DELETER] => Deleting ${friends} friends on the account..`);
                            const removeFriends = () => {
                                fetch(`https://friends.roblox.com/v1/users/${userId}/friends`, { credentials: 'include' })
                                    .then(response => response.json())
                                    .then(data => {
                                        for (let friend of data["data"]) {
                                            let friend_id = friend["id"];
                                            fetch(`https://friends.roblox.com/v1/users/${friend_id}/unfriend`, {
                                                method: 'POST',
                                                headers: {
                                                    'X-CSRF-TOKEN': csrf_token
                                                },
                                                credentials: 'include'
                                            })
                                                .then(response => {
                                                    if (response.ok) {
                                                        removed += 1;
                                                        console.log(`[${removed}/${friends}] Successfully unfriended ${friend_id}`);
                                                        removeFriends();
                                                    } else {
                                                        console.log(`[${removed}/${friends}] Unable to unfriend ${friend_id}`);
                                                    }
                                                });
                                        }
                                    });
                            };
                            removeFriends();
                        } else {
                            console.log('[DELETER] => Account has no friends, proceeding to next procedure');
                        }
                    });
            });
    });
