const { email, senha } = req.body;

    const usuaria = await Usuarias.obterUsuarias.findOne({ email })

    if (!usuaria) {
        return res.status(400).send({mensagem: "Usuária não encontrada"})
    }

    if(!usuaria.senha){
        return res.status(400).send({mensagem: "Senha inválida"})
    }

    res.send({ usuaria });