<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DataResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'code' => $this->code,
            'objectif' => $this->objectif,
            'risque_couvert' => $this->risque_couvert,
            'periodicite' => $this->periodicite,
            'exhaustivite' => $this->exhaustivite,
            'preuve' => $this->preuve,
            'etat' => $this->etat,
            'fichier' => $this->fichier,
            'controle_id' => new ControleResource($this->controle),
            'direction_id' => new DirectionResource($this->direction),
            'service_id' => new ServiceResource($this->service),
            'pole_id' => new PoleResource($this->pole),
            'activite_id' => new ActiviteResource($this->activite),
            'departement_id' => new DepartementResource($this->departement),
            'user_id' => new UtilisateurResource($this->user),
        ];
    }
}
