# Roblox Friends Purger (Console Script)

Bulk-unfriend **all friends** from a target Roblox account (e.g., your own) directly from the browser console.  
The script safely acquires a CSRF token, enumerates the entire friends list with pagination, and unfriends each user with progress logging and optional throttling.

> **⚠️ Irreversible-ish:** Unfriending removes connections and notifications. Re-adding requires manual action. Use only on accounts you own and in line with Roblox’s Terms.

---

## ⚡ How to Use

1. **Log in** to your Roblox account in your browser:  
   https://www.roblox.com/

2. **Open the target user’s Friends page** (usually your own, if you’re purging yours):  
If you open this page, the script can auto-detect `<USER_ID>` from the URL.  
Otherwise, you can set it explicitly in the config below.

3. **Open DevTools → Console**  
- Chrome / Edge: `F12` → **Console**  
- Firefox: `Ctrl+Shift+K`  
- Safari: `Cmd+Opt+C`

4. **Copy–paste the script** from the block below into the Console and press **Enter**.
