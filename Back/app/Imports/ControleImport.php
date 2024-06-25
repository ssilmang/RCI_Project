<?php

namespace App\Imports;

use App\Models\Controle;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class ControleImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Controle([
            'code' => $row['code'],
            'objectif' => $row['objectif'],
            'periodicite' => $row['periodicite'],
            'exhaustivite' => $row['exhaustivite'],
            'preuve' => $row['preuve'],
            'etat' => $row['etat'],
            'nom du controle' => $row['nom_du_controle'],
            'commentaire' => $row['commentaire'],
            'descriptif' => $row['descriptif'],
            'risque' => $row['risque'],
            'direction' => $row['direction'],
            'service Concerné' => $row['service_Concerné'],
            'pole' => $row['pole'],
            'activite' => $row['activite'],
            'departement'=> $row['departement'],
            'Type Controle' => $row['Type_Controle'],
           
        ]);
    }
}
