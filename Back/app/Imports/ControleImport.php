<?php

namespace App\Imports;

use App\Models\Controle;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class controleImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return  Controle|null
     */
    public function model(array $row)
    
    {// Vérification et récupération de chaque donnée requise
$direction = isset($row['Direction']) ? $row['Direction'] : null;
$periodicite = isset($row['Périodicité']) ? $row['Périodicité'] : null;
$exhaustivite = isset($row['Couverture']) ? $row['Couverture'] : null;
$preuve = isset($row['Preuve demandée']) ? $row['Preuve demandée'] : null;
$etat = isset($row['État']) ? $row['État'] : null;
$commentaire = isset($row['Commentaire']) ? $row['Commentaire'] : null;
$risque_id = isset($row['Risque couvert']) ? $row['Risque couvert'] : null;
$service_id = isset($row['Service']) ? $row['Service concerné'] : null;
$pole_id = isset($row['Pôle']) ? $row['Pôle'] : null;
$activite_id = isset($row['Activité']) ? $row['Activité'] : null;
$departement_id = isset($row['Département']) ? $row['Département'] : null;
$user_id = isset($row['user_id']) ? $row['Nom du contrôleur'] : null;
$fichier = isset($row['Fichier preuve']) ? json_encode($row['Fichier preuve']) : null;

// Création de l'objet Controle avec les données récupérées
$controle = new Controle([
    'direction_id' => $direction,
    'periodicite' => $periodicite,
    'exhaustivite' => $exhaustivite ,
    'preuve' => $preuve,
    'data_id'=>1,
    'etat' =>$etat,
    'commentaire' => $commentaire,
    'date_ajout' => now(), // Assurez-vous que la fonction now() retourne la date actuelle correctement formatée
    'risque_id' => $risque_id,
    'service_id' => $service_id,
    'pole_id' => $pole_id,
    'activite_id' => $activite_id,
    'departement_id' => $departement_id,
    'user_id' => $user_id,
    'validate' => 'Non validé',
    'fichier' =>$fichier,
]);

// Retourne l'objet Controle créé


        
    }
}
