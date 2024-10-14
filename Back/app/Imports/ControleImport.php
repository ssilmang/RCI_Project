<?php

namespace App\Imports;

use Carbon\Carbon;
use App\Models\Pole;
use App\Models\User;
use App\Models\Risque;
use App\Models\Service;
use App\Models\Activite;
use App\Models\Controle;
use App\Models\Direction;
use App\Models\Departement;
use App\Models\TypeControle;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ControleImport  
{
    public function model($row)
    {
        // Initialisation des variables pour chaque entité
        $direction = null;
        $pole = null;
        $departement = null;
        $service = null;
        $activite = null;
        $typeControle = null;
        $risque = null;
        $user = null;
    
    
        if (isset($row['Direction'])) {
            $direction = Direction::firstOrCreate(['libelle' => $row['Direction']]);
        }
    // return response()->json( $direction);
       
        if (isset($row['Pôle']) && $direction->id) {
            $pole = Pole::firstOrCreate(['libelle' => $row['Pôle'], 'direction_id' => $direction->id]);
        }
    
        // Trouver ou créer le Département
        if (isset($row['Département ']) && $direction && $pole) {
            $departement = Departement::firstOrCreate(['libelle' => $row['Département '], 'direction_id' => $direction->id, 'pole_id' => $pole->id]);
        }
         return response()->json(   $row);
    
        // Trouver ou créer le Service
        if (isset($row['Service concerné']) && $departement) {

            $service = Service::firstOrCreate(['libelle' => $row['Service concerné'], 'departement_id' => $departement->id]);
        }
        // return response()->json($row['Activité ']);
        // Trouver ou créer l'Activité
        if (isset($row['Activité ']) && $service) {

            $activite = Activite::firstOrCreate(['libelle' => $row['Activité '], 'service_id' => $service->id]);
            // return response()->json($activite);
        }

         
    
        // Trouver ou créer le Type de Contrôle
        if (isset($row['Type controle'])) {
            $typeControle = TypeControle::firstOrCreate(['libelle' => $row['Type controle']]);
        }
    
        // Trouver ou créer le Risque
        if (isset($row['Risque Couvert'])) {

            $risque = Risque::firstOrCreate(['libelle' => $row['Risque Couvert']]);
        }
    
        // Vérifier si le porteur existe dans la table users
        if (isset($row['Porteur'])) {
            $user = User::where('nom_complet', $row['Porteur'])->first();
        
            // S'il n'existe pas, le créer
            if (!$user) {
                $user = User::create([
                    'nom_complet' => $row['Porteur'],
                    'direction_id' => $direction->id ?? null,
                    'pole_id' => $pole->id ?? null,
                    'departement_id' => $departement->id ?? null,
                    'service_id' => $service->id ?? null,
                    'profil_id' => 1,         // Profil de l'utilisateur
                    'password' => bcrypt('porteur'),  // Hasher le mot de passe
                ]);
            }
        }
    
        // Créez ou mettez à jour le contrôle avec les données
        Controle::create([
            'user_id' => $user->id ?? null,
            'activite_id' =>$activite->id ?? null,
            'service_id' =>$service->id?? null,
            'departement_id' => $departement->id ?? null,
            'direction_id' => $direction->id ?? null,
            'risque_id' => $risque->id ?? null,
            'pole_id' => $pole->id ?? null,
            'type_controle_id' => $typeControle->id ?? null,
            'controle' => $row['Nom du contrôle'] ?? null,
            'code' => $row['Code'] ?? null,
            'descriptif' => 'hhhjbjibijj' ?? null,
            'objectif' => $row['L\'Objectif du contrôle '] ?? null,
            'periodicite' => $row['Périodicité'] ?? null,
            'exhaustivite' => $row['Couverture']?? null,
            'preuve' => $row['Preuves demandées'] ?? null,
            'commentaire' => 'mon commentaire' ?? null,
            'etat' => 'Non Validé' ?? null,
            'date_ajout' => isset($row['Date ajout']) ? Carbon::parse($row['Date ajout']) : null,
            'archived_at' => isset($row['archived_at']) ? Carbon::parse($row['archived_at']) : null,
            'validate' => $row['Statut'] ?? null,
            'deleted_at' => isset($row['deleted_at']) ? Carbon::parse($row['deleted_at']) : null,
            'fichier' => $row['fichier'] ?? null,
        ]);
    }
    
    

}

