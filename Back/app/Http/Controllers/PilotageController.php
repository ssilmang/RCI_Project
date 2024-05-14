<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataResource;
use App\Models\Pilotage;
use Illuminate\Http\Request;

class PilotageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = Pilotage::all();
        return DataResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            if (!$request->user_id || $request->user_id==null) {
                return response()->json([
                    'error' => 'Veuillez choisir le porteur!']);
            }

            if (!$request->controle_id || $request->controle_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir le controle!'
                ]);
            }

            if (!$request->direction_id || $request->direction_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir la direction!'
                ]);
            }

            if (!$request->preuve || $request->preuve == null) {
                return response()->json([
                    'error' => 'Veuillez renseigner la preuve demandée!'
                ]);
            }

            if (!$request->objectif || $request->objectif == null) {
                return response()->json([
                    'error' => "Veuillez renseigner l'objectif du controle!"
                ]);
            }

            Pilotage::create([
                'controle_id' => $request->controle_id,
                'direction_id' => $request->direction_id,
                'pole_id' => ($request->pole_id != null) ? $request->pole_id : null,
                'departement_id' => ($request->departement_id != null) ? $request->departement_id : null,
                'service_id' => ($request->service_id != null) ? $request->service_id : null,
                'activite_id' => ($request->activite_id != null) ? $request->activite_id : null,
                'code' => $request->code,
                'objectif' => $request->objectif,
                'risque_couvert' => $request->risque_couvert,
                'user_id' => $request->user_id,
                'periodicite' => $request->periodicite,
                'exhaustivite' => $request->exhaustivite,
                'preuve' => $request->preuve,
                'fichier' => ($request->fichier!=null) ? $request->fichier : null,
                'etat' => false,
            ]);

            return response()->json([
                'message' => 'Pilotage créé avec succès!',
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Une erreur est survenue : ' . $th->getMessage(),
            ], 500);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id){
        try {
            $pilotage = Pilotage::find($id);

            if (!$pilotage) {
                return response()->json(['error' => 'Pilotage non trouvé'], 404);
            }

            if (!$request->user_id || $request->user_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir le porteur!'
                ]);
            }

            if (!$request->controle_id || $request->controle_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir le controle!'
                ]);
            }

            if (!$request->direction_id || $request->direction_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir la direction!'
                ]);
            }

            if (!$request->preuve || $request->preuve == null) {
                return response()->json([
                    'error' => 'Veuillez renseigner la preuve demandée!'
                ]);
            }

            if (!$request->objectif || $request->objectif == null) {
                return response()->json([
                    'error' => "Veuillez renseigner l'objectif du controle!"
                ]);
            }

            $pilotage->update([
                'controle_id' => $request->controle_id,
                'direction_id' => $request->direction_id,
                'pole_id' => ($request->pole_id != null) ? $request->pole_id : null,
                'departement_id' => ($request->departement_id != null) ? $request->departement_id : null,
                'service_id' => ($request->service_id != null) ? $request->service_id : null,
                'activite_id' => ($request->activite_id != null) ? $request->activite_id : null,
                'code' => $request->code,
                'objectif' => $request->objectif,
                'risque_couvert' => $request->risque_couvert,
                'user_id' => $request->user_id,
                'periodicite' => $request->periodicite,
                'exhaustivite' => $request->exhaustivite,
                'preuve' => $request->preuve,
                'fichier' => ($request->fichier != null) ? $request->fichier : null,
                'etat' => false,

            ]);

            return response()->json([
                'message' => 'Pilotage mise à jour avec succès!',
            ], 200);
        } catch (\Throwable $th) {

            return response()->json([
                'error' => 'Une erreur est surveneedfeue : ' . $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pilotage = Pilotage::find($id);

        if (!$pilotage) {
            return response()->json(['error' => 'Pilotage not found'], 404);
        }

        $pilotage->delete();

        return response()->json(['message' => 'Pilotage deleted successfully']);
    }

    public function restaurer($id)
    {
        $pilotage =Pilotage::onlyTrashed()->find($id);
        if ($pilotage) {

            $pilotage->restore();

            return response()->json([
                'message' => 'Le pilotage a été restaurée avec succès.',
                'pilotage' => $pilotage
            ]);
        } else {
            return response()->json([
                'error' => 'Le pilotage n\'a pas été trouvée.',
            ], 404);
        }
    }
    }

