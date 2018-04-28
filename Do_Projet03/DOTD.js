function initier(){
	var laDate = new Date();
	balise('tbAnnee', laDate.getFullYear());
	balise('ddlMois', laDate.getMonth());
	creerTableCalendrier();
	gererNomsSemaine();
	initierTableauCalendrier();
	//gererCalendrier();
	calendrier(document.form.tbAnnee, document.form.ddlMois);
	afficherPiedPage();
}

/*Créer le tableau calendrier*/
function creerTableCalendrier(){
	var strCalendrier, jour, bloc, compteurBloc = 0;

	strCalendrier = '<table class="tableau">';
	strCalendrier += '<tr class="rangeeJours">';
	for(var i=0;i<7;i++){
		jour = 'jour'+i;
		strCalendrier += '<th id="'+jour+'" name="'+jour+'">'+'</th>';
	}
	strCalendrier += '</tr>';
	for(var i=0;i<6;i++){
		strCalendrier += '<tr>';
		for(var j=0;j<7;j++){
			bloc = 'bloc'+compteurBloc++;
			strCalendrier += '<td id="'+bloc+'" name="'+bloc+'" ></td>';
		}
		strCalendrier += '</tr>';
	}
	strCalendrier += '</table>';
	balise('calendrier', strCalendrier);
}

/*changer les jours par 1 lettre ou par 3 lettres*/
/*exécuter après le changement de la taille de la fenêtre*/
function debounce(func){
  var timer;
  return function(event){
    if(timer) clearTimeout(timer);
    timer = setTimeout(func,100,event);
  };
}
window.addEventListener("resize",debounce(function(e){
	gererNomsSemaine();
}));

function gererNomsSemaine(){
	var tabJours = new Array("Dim", "Lun", "Mar", "Mer", "Jeu", "Ven","Sam");
	var jour;
	var strJour = tabJours[0]+"";
	for(var i=0;i<tabJours.length;i++){
		jour = 'jour'+i;
		if(window.innerWidth <= 640){
			balise(jour,tabJours[i].charAt(0));
		}
		else{
			balise(jour,tabJours[i]);
		}
	}
}

/*Effacer le contenu du calendrier*/
function initierTableauCalendrier(){
	for(var i=0;i<42;i++){
		balise('bloc'+i,'');
		baliseClass('bloc'+i,'');
	}
}

function afficherPiedPage(){
	var strFlux = '<hr align=center width=100% size="4" noshade/>'
	+'<p>Copyright Thang David Do - Tout droits r&eacute;serv&eacute;s</p>';
	balise('piedPage',strFlux);
}

function balise(strBalise, strValeur) {
	var objBalise = objetBalise(strBalise);
	if (objBalise.value != undefined) {
		if (strValeur != undefined) objBalise.value = strValeur;
		else return objBalise.value;
	} else {
		if (strValeur != undefined) objBalise.innerHTML = strValeur;
		else return objBalise.innerHTML;
	}
}

function baliseMAJ(strBalise,strContenu) {
	balise(strBalise,balise(strBalise)+strContenu);
}

function baliseClass(strBalise, strClasse){
	document.getElementById(strBalise).className = strClasse;
}
function baliseClassMAJ(strBalise, strClasse){
	document.getElementById(strBalise).className = document.getElementById(strBalise).className + ' ' + strClasse;
}

function objetBalise(strBalise) {
	if (!document.getElementById(strBalise)) {
		alert('Attention... balise "' + strBalise + '" inexistante !');
	}
	else return document.getElementById(strBalise);
}

function parseInt10(strValeur) {
	return parseInt(strValeur, 10);
}

function test() {
	alert('test');
}
