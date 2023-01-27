const loginIdValidator = new FieldValidator('txtLoginId', function(val) {
    if(!val) {
        return '请填写账号';
    }
});

const loginPwdValidator = new FieldValidator('txtLoginPwd', async function(val) {
    if(!val) {
        return '请填写密码';
    }
});


const form = $('.user-form');

form.onsubmit = async function(e) {
    e.preventDefault();
    const result = await FieldValidator.validate(loginIdValidator,
                            loginPwdValidator
                           );
    if(!result) {
        return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const resp = await API.login(data);
    if(resp.code === 0) {
        alert('登录成功');
        location.href = './index.html';
    }
    else {
        loginIdValidator.p.innerText = '账号或密码错误';
        loginPwdValidator.input.value = '';
    }
}