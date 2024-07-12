<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UtilisateurResource extends JsonResource
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
            'nom_complet' => $this->nom_complet,
            'matricule' => $this->matricule,
            'telephone' => $this->telephone,
            'addresse' => $this->addresse,
            'email' => $this->email,
            'direction_id' => new DirectionResource($this->direction),
            'service_id' => new ServiceResource($this->service),
            'pays_id' => new ContryResource($this->pays),
            'profil_id' => new ProfilResource($this->profil),
            // 'photo' => $this->photo,
        ];
    }
}
