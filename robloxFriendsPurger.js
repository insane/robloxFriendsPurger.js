let vars = {friends: null, friends_removed: null, csrf_token: null, user_id: null}

const _fetch = async (url, data) => {
    const response = await fetch(url, data)
    if (!response.ok) {
        throw new Error(`[DELETER] Error fetching URL: ${url} (${response.status})`)
    }
    return await response.json()
}

const unfriend = async (friend) => {

    const response = await _fetch(`https://friends.roblox.com/v1/users/${friend.id}/unfriend`, {method: "POST", headers: {"X-CSRF-TOKEN": vars.csrf_token}, credentials: "include"})

    if (Object.keys(response).length === 0) {
        vars.friends_removed += 1
        console.log(`[DELETER] [${vars.friends_removed}/${vars.friends}] Successfully unfriended ${friend.id}`)
    } else {
        console.log(`[DELETER] [${vars.friends_removed}/${vars.friends}] Unable to unfriend ${friend.id}`)
    }
}

const delete_friends = async () => {
    const {data} = await _fetch(`https://friends.roblox.com/v1/users/${vars.user_id}/friends`, {credentials: "include"})
    await Promise.all(data.map(unfriend))
}

(async () => {
    try {

        vars.csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute("data-token") || console.log("[DELETER] Unable to fetch CSRF Token")

        const {UserId} = await _fetch("https://www.roblox.com/my/account/json", {credentials: "include"})
        vars.user_id = UserId

        const {count} = await _fetch("https://friends.roblox.com/v1/my/friends/count", {credentials: "include"})
        vars.friends = count

        if (vars.friends >= 1) {
            console.log(`[DELETER] => Deleting ${vars.friends} friends on the account..`)
            await delete_friends()
        } else {
            console.log("[DELETER] => Account has no friends, proceeding to next procedure")
        }
        
    } catch (error) {console.error(`[DELETER] ${error}`)}
})()