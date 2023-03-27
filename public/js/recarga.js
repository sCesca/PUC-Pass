const botao = document.querySelectorAll('.botao-recarga');
const code = document.getElementById('number-code');
console.log(botao);

botao.forEach(element => {
    element.addEventListener('click', (e) => {
        var id = e.target.getAttribute('id');

        localStorage.setItem("codigo", code.value);

        if (id === 'botao-unico-recarga') localStorage.setItem("tipo", "Bilhete Único");
        else if (id === 'botao-duplo-recarga') localStorage.setItem("tipo", "Bilhete Duplo");
        else if (id === 'botao-semanal-recarga') localStorage.setItem("tipo", "Bilhete Semanal");
        else {
            localStorage.setItem("tipo", "Bilhete Mensal");
        }

        let codigo = localStorage.getItem("codigo");
        let tipo = localStorage.getItem("tipo");

        let objBilhete = { codigo: parseInt(codigo), tipo: tipo};
        let url = `http://localhost:3000/recarga`

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
    });


});