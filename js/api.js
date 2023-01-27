var API = (function (){
    const TOKEN_KEY = 'token';

async function get(path) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if(token) {
        headers.authorization = `Bearer ${token}`;
    }
    return fetch('https://study.duyiedu.com' +  path,{headers});
}

async function post(path,bodyObj) {
    const headers = {
        'content-type': 'application/json',
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if(token) {
        headers.authorization = `Bearer ${token}`;
    }
    return fetch('https://study.duyiedu.com' + path,{headers,method:'POST',body: JSON.stringify(bodyObj)});
}

async function reg(userInfo) {
    const resp =  await post('/api/user/reg',userInfo)
        // method :'POST',
        // headers : {
        //     'Content-Type': 'application/json'
        // },
        // body : JSON.stringify(userInfo)
    // .then(resp=>resp.json());
    return await resp.json();
}

async function login(loginId) {
    const resp =  await post('/api/user/login', loginId)
    const result = await resp.json();
    if(result.code === 0)
    {
        const token = resp.headers.get('authorization');
        localStorage.setItem(TOKEN_KEY,token);
    }
    return result;
}

async function exists(loginId) {
    const resp = await get('/api/user/exists?loginId='+loginId);
    return resp.json();
}

async function profile() {
    const resp = await get('/api/user/profile');
    return await resp.json();
}

async function sendChat(content) {
    const resp = await post('/api/chat', {content});
    return await resp.json();
}

async function getHistory() {
    const resp = await get('/api/chat/history');
    return await resp.json();

}

function loginOut() {
    localStorage.removeItem(TOKEN_KEY);
};
return {
    reg,
    login,
    exists,
    profile,
    sendChat,
    getHistory,
    loginOut,
  };
})()
