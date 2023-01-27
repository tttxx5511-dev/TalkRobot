class FieldValidator {
    constructor(txtId, validatorFunc) {
        this.input = $('#' + txtId);
        this.p = this.input.nextElementSibling;
        this.validatorFunc = validatorFunc;
        this.input.onblur = () => {
          this.validate();
        };
      }

    async validate(){
        const err =  await this.validatorFunc(this.input.value);
    if (err) {
      // 有错误
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = '';
      return true;
    }    
  }

  static async validate(...validators) {
   const proms = validators.map(v=>v.validate());
   const result = await Promise.all(proms);
   return result.every(r=>r);
  }

}

// function test() {
//     FieldValidator.validate(loginIdValidator, nicknameValidator).then(
//     (result) => {
//         console.log(result);
//     }
//   );
// }
