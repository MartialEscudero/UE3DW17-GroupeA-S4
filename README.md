# Groupe A - UE3DW17 - S4

## Groupe A
- Escudero Martial
- Denajar Gabriel
- Perrichot Pacome

## Installation & Lancement de l'app

Télécharger le fichier JSON [countries.js](https://raw.githubusercontent.com/mledoze/countries/master/countries.json), extraire le fichier puis l'ajouter au répertoire.

```bash
# installation
npm install

# création de la table
node CountriesCreateTable.js

# chargement des données
node CountriesLoadData.js

# développement
npm start
```

## Liens vers chaque page
- [/eucountries](http://localhost:3000/eucountries) ➜ Noms des pays européens
- [/africa](http://localhost:3000/africa) ➜ Noms des pays africains de la 10ème à la 22ème position, triés par superficie
- [/onecountrie](http://localhost:3000/onecountrie) ➜ Toutes les infos disponibles sur un pays donné
- [/dutch](http://localhost:3000/dutch) ➜ Noms des pays avec le néerlandais dans leurs langues officielles
- [/startwithp](http://localhost:3000/startwithp) ➜ Noms des pays qui commencent par la lettre P
- [/areacountries](http://localhost:3000/areacountries) ➜ Noms et superficie des pays ayant une superficie entre 400000 et 500000 km2