

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

    //console.log(conteudoEmail);

    var posProtSAEP = conteudoEmail.search   ("Laudo Pericial nº:");
    var posProtSAEPret = conteudoEmail.search("Protocolo:");

    posProtSAEP = (posProtSAEPret!=-1 ? posProtSAEPret-8 : posProtSAEP);

    var posOrigem = conteudoEmail.search("Origem:");
    var posMSG = conteudoEmail.search("MSG n°:");
    var posAutoridade = conteudoEmail.search("Autoridade Requisitante:");
    var posEmailReq = conteudoEmail.search("Email Requisitante:");
    var posNaturezaInformada = conteudoEmail.search("Natureza da Ocorrência:");
    var posFlagrante = conteudoEmail.search("Flagrante:");
    var posDataFatoInfo = conteudoEmail.search("Data Fato:");
    var posLocalFatoInfo = conteudoEmail.search("Local do Fato:");
    var posLocalExameInfo = conteudoEmail.search("Local do Exame:");
    var posAcusado = conteudoEmail.search("Acusado");
    var posVitimaInfo = conteudoEmail.search("Vitíma");
    var posVitimaFatal = conteudoEmail.search("Vitíma Fatal:");
    var posPreservaInfo = conteudoEmail.search("Preservado:");
    var posPrioridade = conteudoEmail.search("Prioridade:");
    var posObjetivoExame = conteudoEmail.search("Objetivo do Exame:");
    var posHistoricoInfo = conteudoEmail.search("Histórico:");
    var posVeiculoInfo = conteudoEmail.search("Veículo");


    document.getElementById("cNomeVit").value = conteudoEmail.substring(posVitimaInfo+10,posVitimaFatal).trim();

    if(conteudoEmail.substring(posPreservaInfo+11,posPrioridade).search(/sim/i) != -1){
        document.getElementById("preservacaoInformada").innerHTML = document.getElementById("preservacaoInformada").innerHTML + "Usar Preservação Informada: " + conteudoEmail.substring(posPreservaInfo+11,posPrioridade).trim();
        document.getElementById("usarPreserInformada").hidden = false;
    }

    var endFato = conteudoEmail.substring(posLocalFatoInfo+14,posLocalExameInfo);
    var endExame = conteudoEmail.substring(posLocalExameInfo+15,posAcusado);

    document.getElementById("taObjExam").value = conteudoEmail.substring(posObjetivoExame+19,posHistoricoInfo);
    document.getElementById("taHist").value = conteudoEmail.substring(posHistoricoInfo+10,posVeiculoInfo).trim();

    if (endExame == " 	"){
        endExame = endFato;
    }

    document.getElementById('cProtSAEP').value = conteudoEmail.substring(posProtSAEP+19,posProtSAEP+30);

    var vBoletimDelegacia = conteudoEmail.substring(posOrigem+8,posMSG);

    
    document.getElementById('cBO').value = vBoletimDelegacia.substring(0,vBoletimDelegacia.search("/")+5);
    document.getElementById('cDelegacia').value = vBoletimDelegacia.substring(vBoletimDelegacia.search("/")+6).trim();
    document.getElementById('cAutoridade').value = conteudoEmail.substring(posAutoridade+24,posEmailReq).trim();

    document.getElementById('cNatInfo').innerHTML = "Natureza Informada: "+conteudoEmail.substring(posNaturezaInformada+24,posFlagrante);

    if ((conteudoEmail.search("furto") != -1) ||(conteudoEmail.search("Furto") != -1)||(conteudoEmail.search("FURTO") != -1)){
        document.getElementById('cNatuFurt').checked = true;
    }

    var vDatinha = conteudoEmail.substring(posDataFatoInfo+11,posDataFatoInfo+21)
    var montaDataFato = vDatinha.substring(6,10)+"-"+vDatinha.substring(3,5)+"-"+vDatinha.substring(0,2);

    document.getElementById('cDataFatos').value = montaDataFato;
    document.getElementById('cHoraFatos').value = conteudoEmail.substring(posDataFatoInfo+22,posDataFatoInfo+27);

    document.getElementById('cRua').value = endExame.trim();

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
