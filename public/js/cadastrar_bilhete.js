document.getElementById('btnTermo').addEventListener('click', gerarDados);

function gerarDados() {

    localStorage.setItem("codigo", new Date().getTime());


    var today = new Intl.DateTimeFormat('pt-BR', {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }).format(today);


    localStorage.setItem("data", today);
    //localStorage.setItem("tipo", "teste");

    let codigo = localStorage.getItem("codigo");
    // let tipo = localStorage.getItem("tipo");
    let data = today;

    let objBilhete = { codigo: parseInt(codigo), data: data };
    let url = `http://localhost:3000/geraBilhete`


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


}

