function banco_de_dados() {
    process.env.ORA_SDTZ = "UTC-3";

    this.getConexao = async function () {
        if (global.conexao) return global.conexao;

        const oracledb = require('oracledb');
        const dbConfig = require('./dbconfig.js');

        try {
            global.conexao = await oracledb.getConnection({
                user: "system",
                password: "maradavi1",
                connectionString: "192.168.1.15/XE"
            });
        }
        catch (err) {
            console.log("Falha na conexão com o Oracle DB");
            process.exit(1);
        }

        console.log("Oracle DB conectado");

        return global.conexao;
    }

    this.estrutureSe = async function () {
        try {
            const conexao = await this.getConexao();

      
            const sqlBilhetes = 'CREATE TABLE BILHETES (NUMERO_BILHETE INTEGER NOT NULL PRIMARY KEY, DATA_CRIACAO TIMESTAMP NOT NULL)';

            const sqlRecarga = 'CREATE TABLE RECARGAS (NUMERO_BILHETE INTEGER NOT NULL, TIPO VARCHAR(50) NOT NULL,' +
                'DATA_RECARGA TIMESTAMP NOT NULL,' + 'CONSTRAINT FK_RECARGAS_BILHETES FOREIGN KEY (NUMERO_BILHETE) REFERENCES BILHETES(NUMERO_BILHETE))';

            const sqlUtilizacao = 'CREATE TABLE UTILIZACOES (NUMERO_BILHETE INTEGER NOT NULL, DATA_UTILIZACAO TIMESTAMP NOT NULL,' +
                'CONSTRAINT FK_UTILIZACOES_BILHETES FOREIGN KEY (NUMERO_BILHETE) REFERENCES BILHETES(NUMERO_BILHETE))';
                   
            await conexao.execute(sqlBilhetes);
            await conexao.execute(sqlRecarga);
            await conexao.execute(sqlUtilizacao);

        }
        catch (erro) {} // se a já existe, ignora e toca em frente
    }

}

function Bilhetes(bd) {
    this.bd = bd;

    this.inclua = async function (bilhete) {
        try {
            const conexao = await this.bd.getConexao();

            const insercao = "INSERT INTO BILHETES (NUMERO_BILHETE, DATA_CRIACAO) VALUES (:0, CURRENT_TIMESTAMP)";

            const dados = [bilhete.codigo];

            await conexao.execute(insercao, dados);

            const commit = "COMMIT";
            await conexao.execute(commit);

        }
        catch (erro) {
            console.log("Erro ao tentar executar o insert na tabela Bilhetes");
            console.log(erro);
        }
    }

    this.recarga = async function (bilhete) {
        try {
            const conexao = await this.bd.getConexao();

            const insercao = "INSERT INTO RECARGAS (NUMERO_BILHETE, TIPO, DATA_RECARGA) VALUES (:0, :1, CURRENT_TIMESTAMP)";

            const dados = [bilhete.codigo, bilhete.tipo];

            await conexao.execute(insercao, dados);

            const commit = "COMMIT";
            await conexao.execute(commit);

        }
        catch (erro) {
            console.log("Erro ao tentar executar o insert na tabela recarga");
        }
    }

    this.selectUm = async function (codigo) {
        const conexao = await this.bd.getConexao();

        const sql = "SELECT NUMERO_BILHETE FROM BILHETES WHERE NUMERO_BILHETE=:0";
        const dados = [codigo];
        ret = await conexao.execute(sql, dados);

        return ret;
    }

    this.selectRec = async function (codigo) {
        const conexao = await this.bd.getConexao();

        const sql = "SELECT * FROM RECARGAS WHERE NUMERO_BILHETE=:0";
        const dados = [codigo];
        ret = await conexao.execute(sql, dados);

        return ret;
    }

    this.selectUtil = async function (codigo) {
        const conexao = await this.bd.getConexao();

        const sql = "SELECT * FROM UTILIZACOES WHERE NUMERO_BILHETE=:0";
        const dados = [codigo];
        ret = await conexao.execute(sql, dados);

        return ret;
    }

    this.incluaUtil = async function (codigo) {
        try {
            const conexao = await this.bd.getConexao();

            const sql = "INSERT INTO UTILIZACOES (NUMERO_BILHETE, DATA_UTILIZACAO) VALUES (:0, CURRENT_TIMESTAMP)";
            const dados = [codigo];
            ret = await conexao.execute(sql, dados);
    
            const commit = "COMMIT";
            await conexao.execute(commit);

        }
        catch (erro) {
            console.log("Erro ao tentar executar o insert na tabela utilizacao");
        }
    }
    this.recupereUm = async function (codigo)
	{
		const conexao = await this.bd.getConexao();
		
		const sql = "SELECT B.NUMERO_BILHETE, TO_CHAR(DATA_CRIACAO, 'YYYY-MM-DD HH24:MI:SS'), TIPO, TO_CHAR(DATA_RECARGA, 'YYYY-MM-DD HH24:MI:SS'), TO_CHAR(DATA_UTILIZACAO, 'YYYY-MM-DD HH24:MI:SS') FROM BILHETES B INNER JOIN RECARGAS R FULL OUTER JOIN UTILIZACOES U ON R.NUMERO_BILHETE = U.NUMERO_BILHETE ON R.NUMERO_BILHETE = B.NUMERO_BILHETE WHERE R.NUMERO_BILHETE = :0"
        const dados = [codigo];
		ret =  await conexao.execute(sql,dados);
        console.log("--------SQL do recuperaUm---------",sql,"-----dados------",dados )
        // console.log(JSON.stringify(ret))
        console.log("rows", ret.rows)
        console.log(JSON.stringify(ret))
        
		
		return ret.rows;
	}

    this.recupereTodos = async function ()
	{
		const conexao = await this.bd.getConexao();
		console.log("--------SQL do recuperautilizaçao---------",sql,"" )
		const sql = "SELECT TIPO,TO_CHAR(DATA_UTILIZACAO, 'YYYY-MM-DD HH24:MI:SS')"+
		            "FROM UTILIZACAOES";
                  
		ret =  await conexao.execute(sql);
        console.log("-----------------------------------------rowsssssssssssssssssssssssssssssssssss", ret.rows)
		return ret.rows;
	}

}

function Bilhete(codigo, tipo, data, recarga, utiliza, expira) {
    this.codigo = codigo;
    this.tipo = tipo;
    this.data = data;
    this.recarga = recarga;
    this.utiliza = utiliza;
    this.expira = expira;
}

function Comunicado(codigo, tipo, mensagem) {
    this.codigo = codigo;
    this.tipo = tipo;
    this.mensagem = mensagem;
}

function middleWareGlobal(req, res, next) {
    console.time('Requisição'); // marca o início da requisição
    console.log('Método: ' + req.method + '; URL: ' + req.url); // retorna qual o método e url foi chamada

    next(); // função que chama as próximas ações

    console.log('Finalizou'); // será chamado após a requisição ser concluída

    console.timeEnd('Requisição'); // marca o fim da requisição
}

async function utilizar(req, res) {
    try {
        const bilhete = new Bilhete(req.body.codigo, req.body.tipo);

        let ret_util = await global.bilhetes.selectUtil(bilhete.codigo);

        console.log(ret_util.rows[0])

        let ret_rec = await global.bilhetes.selectRec(bilhete.codigo);

        console.log(ret_rec.rows[0])
        var tipo = ret_rec.rows[0];

        if (ret_util.rows[0] != undefined) {
            var data = ret_util.rows[0];
            var expira = data[1];
            console.log(expira)
            var atual = new Date();
            console.log(atual)
            var dif = (atual.getTime() - expira.getTime()) / (1000 * 60)
            console.log(dif)
            var tempo;

            if (tipo[1] === 'Bilhete Único') tempo = 40;
            else if (tipo[1] === 'Bilhete Duplo') tempo = 2 * 40;
            else if (tipo[1] === 'Bilhete Semanal') tempo = 7 * 24 * 60;
            else tempo = 30 * 24 * 60;

            console.log(tempo)

            if (dif < tempo) {
                await global.bilhetes.incluaUtil(bilhete.codigo);
                const sucesso = new Comunicado(
                    'Número do bilhete: ' + bilhete.codigo,
                    'O bilhete foi utilizado',
                //mensg
                
                );
                    
                console.log("Voce ja usou: " + dif + " minutos do bilhete")
                return res.status(201).json(sucesso);
            } else {
                const erro2 = new Comunicado(
                    'Bilhete expirou o tempo',
                    'Bilhete inexistente',
                    );
                    return res.status(409).json(erro2);
            }
            
        } else {
            if (ret_rec.rows[0] != undefined) {
                await global.bilhetes.incluaUtil(bilhete.codigo);
                const sucesso = new Comunicado(
                    'Número do bilhete: ' + bilhete.codigo,
                    'Tipo do Bilhete: ' + bilhete.tipo,
                    'O bilhete foi utilizado',
                //mensg
                );
                return res.status(201).json(sucesso);
            } else {
                const erro2 = new Comunicado(
                'LJE',
                'Bilhete inexistente',
                'Não há bilhete cadastrado'
                );
                return res.status(409).json(erro2);
            }
        };  
    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            'LJE',
            'Bilhete inexistente',
            'Não há bilhete cadastrado'
        );

        return res.status(409).json(erro2);
    }
}

async function recarregar(req, res) {
    try {
        const bilhete = new Bilhete(req.body.codigo, req.body.tipo);

        ret = await global.bilhetes.selectUm(bilhete.codigo);

        if (ret.rows[0] != undefined) {
            await global.bilhetes.recarga(bilhete);
            const sucesso = new Comunicado(
                'Número do bilhete: ' + bilhete.codigo,
                'Tipo do Bilhete: ' + bilhete.tipo,
                'O bilhete foi gerado com sucesso',
                //mensg
            );
            return res.status(201).json(sucesso);
        } else {
            const erro2 = new Comunicado(
                'LJE',
                'Bilhete inexistente',
                'Não há bilhete cadastrado'
            );
            return res.status(409).json(erro2);
        }
    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            'LJE',
            'Bilhete inexistente',
            'Não há bilhete cadastrado'
        );

        return res.status(409).json(erro2);
    }
}


async function inclusao(req, res) {
    const bilhete = new Bilhete(req.body.codigo, req.body.tipo);

    try {
        const mensg = await global.bilhetes.inclua(bilhete);

        const sucesso = new Comunicado(
            'Bilhete gerado com sucesso',

        );

        console.log(mensg);
        return res.status(201).json(sucesso);
    }
    catch (erro) {
        console.log(erro);
        const erro2 = new Comunicado(
            'Bilhete em uso'
        );

        return res.status(409).json(erro2);
    }
}

async function recuperacaoDeUm (req, res)
{
    console.log("----------FRONT ACIONANDO O recuperacaoDeUm app.js-------")
    if (req.body.codigo)
    {
        const erro1 = new Comunicado ('JSP','JSON sem propósito',
		                  'Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro1);
    }

    const codigo = req.params.codigo;
    
    let ret;
	try
	{
	    ret = await global.bilhetes.recupereUm(codigo);
        console.log("--------recuperacaoDeUM acionando recuperaum-----------");
	}    
    catch(erro)
    {console.log("erro recuperacaoDeUm", erro)}

	if (ret.length==0)
	{
		const erro2 = new Comunicado ('LNE','Bilhete inexistente',
		                  'Não há Bilhete cadastrado com o código informado');
		return res.status(404).json(erro2);
	}
	else
	{
		ret = ret[0];
		ret = new Bilhete (ret[0],ret[2],ret[1],ret[3],ret[4],ret[5]);
		return res.status(200).json(ret);
	}
}
async function recuperacao (req, res)
{
    if (req.body.codigo)
    {
        const erro = new Comunicado ('JSP','JSON sem propósito',
		             'Foram disponibilizados dados em um JSON sem necessidade');
        return res.status(422).json(erro);
    }
	
    let rec;
	try
	{
	    rec = await global.bilhetes.recupereTodos();
	}    
    catch(erro)
    {}

	if (rec.length==0)
	{
		return res.status(200).json([]);
	}
	else
	{
		const ret=[];
		for (i=0;i<rec.length;i++) ret.push (new Bilhete (rec[i][0]));
		return res.status(200).json(ret);
	}
} 



async function ativarServidor() {
    const bodyParser = require("body-parser");
    const express = require("express");
    const app = express();
    const path = require("path");
    const cors = require("cors");
    const { threadId } = require("worker_threads");

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.engine("html", require("ejs").renderFile);
    app.set("view engine", "html");
    app.use(cors());
    app.use(express.json());
    app.use("/public", express.static(path.join(__dirname, "public")));

    const bd = new banco_de_dados();
    await bd.estrutureSe();

    global.bilhetes = new Bilhetes(bd);


    app.use(middleWareGlobal);


    app.get("/", function (req, res) {
        console.log(__dirname);
        res.render(__dirname + "/public/views/index.html");
    });

    app.get("/termo.html", function (req, res) {
        res.render(__dirname + "/public/views/termo.html");
    });

    app.get("/bilhete.html", function (req, res) {
        res.render(__dirname + "/public/views/bilhete.html");
    });

    app.get("/geraBilhete", function (req, res) {
        res.render(__dirname + "/public/views/bilhete.html");
    });

    app.get("/recarga", function (req, res) {
        res.render(__dirname + "/public/views/recarga.html");
    });

    app.get("/utilizacao", function (req, res) {
        res.render(__dirname + "/public/views/utilizacao.html");
    });
    app.get("/relatorio", function (req, res) {
        res.render(__dirname + "/public/views/relatorio.html");
    });


    app.post('/geraBilhete', inclusao);

    app.post('/recarga', recarregar);

    app.post('/utilizacao', utilizar);

    app.get('/Bilhetes/:codigo', recuperacaoDeUm);
    app.get('/Bilhetes/:codigo', recuperacao);

    app.listen(3000, function () {
        console.log("Servidor rodando na porta 3000");
    });
}

ativarServidor();