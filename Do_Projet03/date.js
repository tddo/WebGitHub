/*Afficher le calendrier à partir du mois et de l'année sélectionnée*/
function calendrier(annee, mois){
	var annee = annee.value;
	var mois = mois.value;
	var premierJour, nbJours, bloc, compteurBloc;
	var tabClasses=new Array(42);

	baliseClass('tbAnnee', 'erreur');

	if (annee == null || annee == ''){
		alert('Le champ de texte pour l\'année est vide!');
	}else if (isNaN(annee)){
		alert('L\'année est incorecte!');
	}else{
		baliseClass('tbAnnee', 'normal');
		initierTableauCalendrier();
		premierJour = trouverPremierJour(annee, mois);
		nbJours = trouverNbJours(annee, mois);
		var noJourAvant, noJourApres = 1;
		if(mois==0){
			noJourAvant = trouverNbJours(annee-1, 11);
		}else{
			noJourAvant = trouverNbJours(annee, (mois-1));
		}

		/*afficher les jours avant le mois sélectionné*/
		for(var i=premierJour-1;i>=0;i--){
			bloc = 'bloc'+i;
			balise(bloc, noJourAvant);
			baliseClass(bloc, 'joursExtras');
			noJourAvant--;
		}
		/*afficher les jours du mois sélectionné*/
		for(var i=1;i<=nbJours;i++){
			bloc = 'bloc'+(premierJour+i-1);
			balise(bloc, i);
		}
		/*afficher les jours après mois sélectionné*/
		for(var i=nbJours+premierJour;i<42;i++){
			bloc = 'bloc'+i;
			balise(bloc, noJourApres);
			baliseClass(bloc, 'joursExtras');
			noJourApres++;
		}

		/*ajouter des couleurs pour les rangées*/
		compteurBloc = 0;
		for(var i=0;i<6;i++){
			for(var j=0;j<7;j++){
				bloc = 'bloc'+compteurBloc++;
				baliseClassMAJ(bloc, 'rangee'+getSaison(mois)+(i%2 == 0? 1:2));
			}
		}
	}
}

function trouverPremierJour(annee, mois){
	return (new Date(annee, mois,1)).getDay();
}

function trouverNbJours(annee, mois){
	if(mois == 1)	{
		if (((annee % 4) == 0) && ((annee % 100 != 0) || (annee % 400 == 0))){
			return(29);
		}
		return(28);
	}else if (mois == 0 || mois == 2 || mois == 4 || mois == 6 ||
		mois == 7 || mois == 9 || mois==11)		{
			return(31);
	}else{
		return(30);
	}
}

/*retourne la saison à partir du mois dans le paramètre*/
function getSaison(mois){
	var tabSaisons = new Array("Printemps", "Ete", "Automne", "Hiver");
	var saison = '';
	mois = parseInt(mois);
	switch(mois){
		case 2: case 3: case 4: saison = tabSaisons[0]; break;
		case 5: case 6: case 7: saison = tabSaisons[1]; break;
		case 8: case 9: case 10: saison = tabSaisons[2]; break;
		case 11: case 0: case 1: saison = tabSaisons[3]; break;
	}
	return saison;
}
