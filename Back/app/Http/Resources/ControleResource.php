<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ControleResource extends JsonResource
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
            'nom_controle' => $this->nom_controle,
            'code' => $this->code,
            'objectif' => $this->objectif,
            'descriptif' => $this->descriptif,
            'type_controle_id' => new TypeResource($this->type),
            // 'type_controle_id' => $this->type_controle_id
        ];
    }
}
