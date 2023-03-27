const botao = document.getElementById('util-btn');
const code = document.getElementById('number-util');
console.log(botao);

botao.addEventListener('click', (e) => {

    var tipo = localStorage.getItem("tipo");
    let objBilhete = { codigo: code.value, tipo: tipo};
    let url = `http://localhost:3000/utilizacao`

    let res = axios.post(url, objBilhete)
    .then(response => {
        if (response.data) {
            const msg = new Comunicado(
                response.data.codigo,
                response.data.tipo,
                response.data.data
            );

            alert(msg.get());
        }
    })
    .catch(error => {

        if (error.response) {
            const msg = new Comunicado(
                error.response.data.codigo,
                error.response.data.tipo,
                error.response.data.data
            );

            alert(msg.get());
        }
    })

    function Comunicado(codigo, tipo, data) {
        this.codigo = codigo;
        this.tipo = tipo;
        this.data = data;

        this.get = function () {
            return (
                this.codigo + " \n " +
                this.tipo + " \n " +
                this.data
            );
        }
    }

    console.log("utilizacao.js" + res);
});