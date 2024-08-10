<?php

namespace App\Imports;

use App\Models\Controle;
use Illuminate\Support\Facades\Hash;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ControleImport implements ToModel,WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return Controle|null
     */
    public function model(array $row)
    {
        return new Controle([
            'direction_id' => $row['Direction'],
            'pole_id' => $row['Pole'],
            'departement_id' => $row['Département'],
            'service_id' => $row['Service concerné'],
            'activite_id' => $row['Activité'],
            'controle_id' => $row['Nom du contrôle'],
            'descriptif' => $row['Descriptif'],
            'objectif' => $row['Objectif'],
            'risque_couvert' => $row['Risque couvert'],
            'user_id' => $row['Porteur'],
            'periodicite' => $row['Périodicité'],
            'couverture' => $row['Couverture'],
            'preuve_demandee' => $row['Preuve'],
             'Type_Controle' => $row['Type controle'],
            'statut' => $row['Statut'],
            'etat' => $row['Etat'],
            'code' => $row['Code'],
            'controle' => $row['Controle'],
            'commentaire' => $row['Commentaire'],


            'date_ajout' => now()
        ]);

    }
}
