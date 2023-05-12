const fs = require('fs');

class Screenshots {
    constructor(escenario) {
        this.escenario = escenario;
        this.step = 0;
    }

    createDir(){
        fs.mkdir('pantallazos', { recursive: true }, (err) => {
            if (err) throw err;
        });
    }

    getName(){
        this.step = this.step + 1;
        return "./pantallazos/".concat(this.escenario).concat("-Step").concat(this.step).concat(".png");
    }
}

module.exports = Screenshots;