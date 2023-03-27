function buscaBilhete () {
    console.log('oi')
	let codigo = document.getElementById('pesquisa').value
	let url = `http://localhost:3000/Bilhetes/${codigo}`

	axios.get(url)
	.then(response => {
		mostraDados (response.data)
        criaListaDinamica(response.data)
        	
	})
	.catch(error  =>  {
		if (error.response) {
			const msg = new Comunicado (error.response.data.codigo, 
										error.response.data.mensagem, 
										error.response.data.descricao);
			alert(msg.get());
		}	
	})

    const criaListaDinamica = ( Bilhetes ) => {
		const ulBilhetes = document.getElementById('Bilhetes')
		Bilhetes.foreach(dados => {
			const listaBilhete = document.createElement('li')
			listaBilhete.innerHTML = ` Tipo bilhete : ${dados.tipo} - utilazado: ${dados.utiliza} `
			ulBilhetes.appendChild(listaBilhete)
    })
  }

	event.preventDefault()
}
function mostraDados (dados, msg) {
       
    // aqui em baixo eu pego do back as informaçoes
    document.getElementById('codigo')     .innerHTML = `Código	    :               ${dados.codigo}`
	document.getElementById('datagerado') .innerHTML = `Data gerado :               ${dados.data}`
    document.getElementById('tipo') .innerHTML = `Tipo de Recarga Presente :        ${dados.tipo}`
    document.getElementById('datarecarga') .innerHTML = `Data da Recarga Presente : ${dados.recarga}`
    document.getElementById('utiliza') .innerHTML = `Bilhete usado em             : ${dados.utiliza}`
    

    // aqui em baixo eu mando pro html as informacoes
	document.getElementById('codigo')          .className = ''
	document.getElementById('datagerado')      .className = ''
    document.getElementById('tipo')            .className = ''
    document.getElementById('datarecarga')     .className = ''
    document.getElementById('utiliza')         .className = ''
    document.getElementById('expira')         .className = ''
	document.getElementById('mensagem')        .className = 'oculto'


}

function mostraMensagem () {
	document.getElementById('pesquisa')   .value = ''

	document.getElementById('codigo')     .className = 'oculto'
	document.getElementById('datagerado').className = 'oculto'
	document.getElementById('mensagem')   .className = ''
}
function Comunicado (codigo,mensagem,descricao)
{
	this.codigo    = codigo;
	this.mensagem  = mensagem;
	this.descricao = descricao;
	
	this.get = function ()
	{
		return (this.codigo   + " - " + 
		        this.mensagem + " - " +
			    this.descricao);

	}
}





