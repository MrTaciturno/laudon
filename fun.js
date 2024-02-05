

//função necessária para gerenciar o COPIA-COLA
function handlePaste(e) {
    var clipboardData, pastedData;

    // Stop data actually being pasted into div
    e.stopPropagation();
    e.preventDefault();

    // Get pasted data via clipboard API
    clipboardData = e.clipboardData || window.clipboardData;
    pastedData = clipboardData.getData('Text');

    // Do whatever with pasteddata
    document.getElementById('cCampodeColagem').value = pastedData;
    fProcessaEmail();
}

function fProcessaEmail(){
    var conteudoEmail = document.getElementById('cCampodeColagem').value;
    document.getElementById('cCampodeColagem').value = "";
    document.getElementById('cCampodeColagem').placeholder= "OK";

    console.log(conteudoEmail);

    var posProtSAEP = conteudoEmail.search   ("Local LiberadoNº");
    var posNumLaudo = conteudoEmail.search   ("Laudo:");
    
    var posTipoOrigem = conteudoEmail.search("Tipo de Origem:");
    var posCidadeOrigem = conteudoEmail.search("Cidade de Origem:");
    
    var posOrigem = conteudoEmail.search("Número do BO:");
    var posOrgaoCircunscricao = conteudoEmail.search("Órgão Circunscrição:");
    var posDPRequisitante = conteudoEmail.search("DP Requisitante:");
        
    var posMSG = conteudoEmail.search("MSG n°:");
    var posAutoridade = conteudoEmail.search("Nome do Requisitante:");
    
    var posEndereco = conteudoEmail.search("Endereço:");

    //var posEmailReq = conteudoEmail.search("Email Requisitante:");

    var posNaturezaExame = conteudoEmail.search("Natureza:");
    var posNaturezaCrime = conteudoEmail.search("Natureza Criminal da Ocorrência:");
    
    //var posDataSolicitacao = conteudoEmail.search("Solicitação:");
    var posDataFatoInfo = conteudoEmail.search("Data/Hora do Fato:");
    var posDataAcionamento = conteudoEmail.search("Protocolo Aberto");
    
    var posDataExame = conteudoEmail.search("Protocolo em Atendimento");

    
    var posLocalFatoInfo = conteudoEmail.search("Local do Fato:");
    var posLocalExameInfo = conteudoEmail.search("Local do Exame:");
    var posAcusado = conteudoEmail.search("Acusado");
    var posVitimaInfo = conteudoEmail.search("Vitíma");
    var posVitimaFatal = conteudoEmail.search("Vitíma Fatal:");
    var posPreservaInfo = conteudoEmail.search("Preservado:");
    var posPrioridade = conteudoEmail.search("Prioridade:");
    
    var posHistoricoInfo = conteudoEmail.search("Histórico:");
    //var posObjetivoExame = conteudoEmail.search("Quesitos:");

    var posQuesitos = conteudoEmail.search("Quesitos:");
    var posObs = conteudoEmail.search("Observações/Mensagem na Íntegra:");
    var posPessoasEnvolvidas = conteudoEmail.search("Pessoas Envolvidas:");

    //var posVeiculoInfo = conteudoEmail.search("Veículo");


    document.getElementById("cNomeVit").value = conteudoEmail.substring(posVitimaInfo+10,posVitimaFatal).trim();

    if(conteudoEmail.substring(posPreservaInfo+11,posPrioridade).search(/sim/i) != -1){
        document.getElementById("preservacaoInformada").innerHTML = document.getElementById("preservacaoInformada").innerHTML + "Usar Preservação Informada: " + conteudoEmail.substring(posPreservaInfo+11,posPrioridade).trim();
        document.getElementById("usarPreserInformada").hidden = false;
    }

    
    document.getElementById("taObjExam").value = conteudoEmail.substring(posQuesitos,posPessoasEnvolvidas);

    document.getElementById("taHist").value = conteudoEmail.substring(posHistoricoInfo+10,posQuesitos);

//    var endFato = conteudoEmail.substring(posLocalFatoInfo+14,posLocalExameInfo);
//    var endExame = conteudoEmail.substring(posLocalExameInfo+15,posAcusado);
//    if (endExame == " 	"){
//      endExame = endFato;
//    }
//   document.getElementById('cRua').value = endExame.trim();


    document.getElementById("cRua").value = conteudoEmail.substring(posEndereco+9,posDataFatoInfo);
    
    document.getElementById('cProtSAEP').value = conteudoEmail.substring(posProtSAEP+17,posNumLaudo-3);
    tempREP = conteudoEmail.substring(posNumLaudo+6).search("/");
    document.getElementById('cREP').value = conteudoEmail.substring(posNumLaudo+7,posNumLaudo+6+tempREP+5);

    document.getElementById('cBO').value = conteudoEmail.substring(posTipoOrigem+16,posCidadeOrigem-3) + conteudoEmail.substring(posOrigem+12,posOrgaoCircunscricao-3) + " - "+conteudoEmail.substring(posDPRequisitante+17,posAutoridade-3);
    
    document.getElementById('cDelegacia').value = conteudoEmail.substring(posOrgaoCircunscricao+21,posDPRequisitante-3)
    
    document.getElementById('cAutoridade').value = conteudoEmail.substring(posAutoridade+22,posEndereco);
  
    document.getElementById('cNatInfo').innerHTML = "Natureza Informada: "+conteudoEmail.substring(posNaturezaExame+10,posNaturezaCrime);

    if ((conteudoEmail.search("furto") != -1) ||(conteudoEmail.search("Furto") != -1)||(conteudoEmail.search("FURTO") != -1)){
        document.getElementById('cNatuFurt').checked = true;
    }


    //datas posDataAcionamento
    var vDatinha = conteudoEmail.substring(posDataFatoInfo+19,posDataFatoInfo+29);
    var montaData = vDatinha.substring(6,10)+"-"+vDatinha.substring(3,5)+"-"+vDatinha.substring(0,2);
    document.getElementById('cDataFatos').value = montaData;
    document.getElementById('cHoraFatos').value = conteudoEmail.substring(posDataFatoInfo+30,posDataFatoInfo+35);
    
    var vDatinha = conteudoEmail.substring(posDataAcionamento-22,posDataAcionamento-12);
    montaData = vDatinha.substring(6,10)+"-"+vDatinha.substring(3,5)+"-"+vDatinha.substring(0,2);
    document.getElementById('cDataAciona').value = montaData;
    document.getElementById('cHoraAciona').value = conteudoEmail.substring(posDataAcionamento-11,posDataAcionamento-6);

    var vDatinha = conteudoEmail.substring(posDataExame-22,posDataExame-12);
    montaData = vDatinha.substring(6,10)+"-"+vDatinha.substring(3,5)+"-"+vDatinha.substring(0,2);
    document.getElementById('cDataExame').value = montaData;
    //console.log("DATA:" + conteudoEmail.substring(posDataExame-11,posDataExame-6));
    document.getElementById('cHoraExame').value = conteudoEmail.substring(posDataExame-11,posDataExame-6);


   

    var probCidade =  conteudoEmail.substring(posOrigem+8,posMSG);

    //nomes possíveis para Americana
    var nomePossivelAmericana = ["Americana", "AMERICANA", "Americana"];
    for(var i=0; i < nomePossivelAmericana.length; i++){
        if (probCidade.search(nomePossivelAmericana[i]) != -1){
            document.getElementById('cAmericana').checked = true;
        }
    }

    //nomes possíveis para Artur Nogueira
    var nomePossivelArturNogueira = ["Nogueira", "NOGUEIRA", "nogueira"];
    for(var i=0; i < nomePossivelArturNogueira.length; i++){
        if (probCidade.search(nomePossivelArturNogueira[i]) != -1){
            document.getElementById('cArturNogueira').checked = true;
        }
    }

    //nomes possíveis para Cosmópolis
    var nomePossivelCosmopolis = ["Cosmópolis", "Cosmopolis", "cosmópolis","cosmopolis", "COSMÓPOLIS", "COSMOPOLIS"];
    for(var i=0; i < nomePossivelCosmopolis.length; i++){
        if (probCidade.search(nomePossivelCosmopolis[i]) != -1){
            document.getElementById('cCosmopolis').checked = true;
        }
    }

    //nomes possíveis para Engenheiro Coelho
    var nomePossivelEngCoelho = ["Coelho", "COELHO", "coelho"];
    for(var i=0; i < nomePossivelEngCoelho.length; i++){
        if (probCidade.search(nomePossivelEngCoelho[i]) != -1){
            document.getElementById('cEngenheiroCoelho').checked = true;
        }
    }
    //nomes possíveis para Hortolândia
    var nomePossivelHortolandia = ["Hortolândia", "HORTOLÂNDIA", "hortolândia","Hortolandia", "HORTOLANDIA", "hortolandia"];
    for(var i=0; i < nomePossivelHortolandia.length; i++){
        if (probCidade.search(nomePossivelHortolandia[i]) != -1){
            document.getElementById('cHortolandia').checked = true;
        }
    }


    //nomes possíveis para Nova Odessa
    var nomePossivelNovaOdessa = ["odessa", "Odessa", "ODESSA"];
    for(var i=0; i < nomePossivelNovaOdessa.length; i++){
        if (probCidade.search(nomePossivelNovaOdessa[i]) != -1){
            document.getElementById('cNovaOdessa').checked = true;
        }
    }

    //nomes possíveis para Monte Mor
    var nomePossivelMonteMor = ["Monte", "MONTE", "monte"];
    for(var i=0; i < nomePossivelMonteMor.length; i++){
        if (probCidade.search(nomePossivelMonteMor[i]) != -1){
            document.getElementById('cMonteMor').checked = true;
        }
    }

    //nomes possíveis para Santa Bárbara d'Oeste
    var nomePossivelSBO = ["Bárbara", "BÁRBARA", "bárbara", "BARBARA", "Barbara", "barbara", "BARB", "Barb", "barb","BáRB", "Bárb", "bárb", "SBO"];
    for(var i=0; i < nomePossivelSBO.length; i++){
        if (probCidade.search(nomePossivelSBO[i]) != -1){
            document.getElementById('cSantaBarb').checked = true;
        }
    }

    //nomes possíveis para Sumare
    var nomePossivelSumare = ["Sumaré", "sumaré", "SUMARÉ", "Sumare", "Sumare", "SUMARÉ"];
    for(var i=0; i < nomePossivelSumare.length; i++){
        if (probCidade.search(nomePossivelSumare[i]) != -1){
            document.getElementById('cSumare').checked = true;
        }
    }

    revela();
}

function revela(){

    var indFTV = document.getElementsByName("tFlagTodosVestigios");

    for (var i = 0; i < indFTV.length; i++){
        var stLabelVest = "cLabelVest"+(i+1);
        var stFlagVest = "cFlagVest"+(i+1);
        var stFieldVestigio = "fieldVestigio"+(i+1);

        document.getElementById(stLabelVest).hidden = !document.getElementById('cNatuFurt').checked;

        if(!document.getElementById('cNatuFurt').checked){
            document.getElementById(stFlagVest).checked = document.getElementById('cNatuFurt').checked;
        }

        dEsconde(stFlagVest,stFieldVestigio);
    }
}

function dataCerta() {
    var currentDate= new Date();
    var day = ("0" + currentDate.getDate()).slice(-2);
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    var today = currentDate.getFullYear()+"-"+(month)+"-"+(day) ;

    var hour = ("0" + currentDate.getHours()).slice(-2);
    var minute = ("0" + currentDate.getMinutes()).slice(-2);

    pacoteData = [day, month, currentDate.getFullYear(), today, hour, minute];
    return pacoteData;

}


function transfereData(prOndeData,prOndeHora) {
    var data = dataCerta();
    document.getElementById(prOndeData).value = data[3];
    document.getElementById(prOndeHora).value = data[4] + ":" + data[5];
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("cLatitute").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("cLatitute").innerHTML = "Latitude: " + position.coords.latitude;
    document.getElementById("cLongitude").innerHTML = "; Longitude: " + position.coords.longitude;
}


function dEsconde(cFlag,field){
    if (document.getElementById(cFlag).checked){
        document.getElementById(field).style.display = "";
    }else{
        document.getElementById(field).style.display = "none";
    }
}
