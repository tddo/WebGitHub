function afficherEnTete(nomFichier){
	var strFlux = '<h1>L\'informatique, &ccedil;a pollue!</h1>';
	if(nomFichier != 'index.html' ){
		if(nomFichier == 'Fabrication.html' )
			strFlux += '<h2>Fabrication d\'un ordinateur</h2>';
		else if(nomFichier == 'Utilisation.html' )
			strFlux += '<h2>Utilisation d\'un ordinateur</h2>';
		else if(nomFichier == '%C3%89limination.html' )
			strFlux += '<h2>&Eacute;limination d\'un ordinateur d&eacute;suet</h2>';
		else if(nomFichier == 'Solution.html' )
			strFlux += '<h2>Est-ce LA solution?</h2>';
	}
	balise('entete',strFlux);
}

function afficherNavigation(nomFichier){
	var strFlux = '<h1>Menu</h1>' + '<ul>';
	if(nomFichier != 'index.html' ) strFlux +=	'<li><a href="index.html">Retourner vers la page d\'accueil</a></li>';
	if(nomFichier != 'Fabrication.html' ) strFlux +=	'<li><a href="Fabrication.html">Fabrication d\'un ordinateur</a></li>';
	if(nomFichier != 'Utilisation.html' ) strFlux +=	'<li><a href="Utilisation.html">Utilisation d\'un ordinateur</a></li>';
	if(nomFichier != '%C3%89limination.html' ) strFlux +=	'<li><a href="&Eacute;limination.html">&Eacute;limination d\'un ordinateur d&eacute;suet</a></li>';
	if(nomFichier != 'Solution.html' ) strFlux +=	'<li><a href="Solution.html">Est-ce LA solution?</a></li>';
	strFlux +=	'</ul>';
	balise('navigation',strFlux);
}

function afficherPiedPage(){
	var dtJour= new Date();
	var strFlux = '<hr align=center width=100% size="4" noshade/>'
				+'<p>Copyright Thang David Do - Tout droits r&eacute;serv&eacute;s</p>'
				+ '<p><a href="mailto:thangdaviddo@pasunvraicourriel.com">Contactez: Thang David Do</a> </p>'
				+ dtJour;
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

function creeObjetXMLHttpRequest() {
  var xmlHttp;
  if(window.ActiveXObject)	//IE
	try { xmlHttp = new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) { xmlHttp = false; }
  else 						//Mozilla et autres navigateurs
	try { xmlHttp = new XMLHttpRequest(); } catch (e) { xmlHttp = false; }
  if(!xmlHttp) 				//Retourne l'objet cr�� ou affiche un message d'erreur
	alert('L\'objet XMLHttpRequest n\'a pas pu �tre cr�� !');
  else
	return xmlHttp;
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

function recoitInfoServeur(xmlHttp,fonctionTraitante) {
  /* Poursuite du traitement seulement si la transaction est compl�t�e */
  if (xmlHttp.readyState == 4) {
	/* Le statut 200 confirme une transaction compl�te r�ussie */
	if (xmlHttp.status == 200) {
		/* Extrait la r�ponse du serveur */
		var strChaineRetourneeParServeur = xmlHttp.responseText;
		/* Ex�cution de la fonction qui traitera la r�ponse */
		fonctionTraitante(strChaineRetourneeParServeur);
	}else{
		alert('Probl�me d\'acc�s au serveur : ' + xmlHttp.statusText);
	}
  }
}

 // Remplacer tous les caract�res 'char1' en 'char2'
String.prototype.replaceAll =
 function (char1, char2) {
	return(this.split(char1).join(char2));
}

function test() {
  alert('test');
}
function transmetRequeteAuServeur(xmlHttp,URLEtParametres,fonctionTraitante) {
  /* Poursuite du traitement seulement si l'objet xmlHttp est disponible */
  if (xmlHttp.readyState == 4 || xmlHttp.readyState == 0) {
	/* Pr�paration de la requ�te qui sera transmise � l'application serveur */
	xmlHttp.open('GET',URLEtParametres,true);
	/* Identification de la fonction qui traitera la r�ponse du serveur et transmission
	du nom de la fonction qui traitera les donn�es */
	xmlHttp.onreadystatechange = function () { recoitInfoServeur(xmlHttp,fonctionTraitante); }
	/* Transmission de la requ�te au serveur */
	xmlHttp.send(null);
  }else{
	/* Si le serveur n'est pas disponible, nouvelle transmission de la requ�te
	dans une seconde */
    setTimeout('transmetRequeteAuServeur(xmlHttp,URLEtParametres,fonctionTraitante)', 1000);
  }
}
