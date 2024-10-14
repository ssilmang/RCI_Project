<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Service::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            if ($user->profil_id != 2) {
                return response()->json([
                    'error' => 'Vous n\'avez pas l\'autorisation d\'ajouter !'
                ]);
            } else {
            $p = Service::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cet service existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            // if ($request->departement_id == null) {
            //     return response()->json([
            //         'error' => 'Veuillez choisir un departement!',
            //     ]);
            // }

            Service::create([
                'libelle' => $request->libelle,
                'departement_id' => $request->departement_id,
            ]);

            return response()->json([
                'message' => 'Service créé avec succès!',
            ], 201);
        }
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
            $user = Auth::user();
            if ($user->profil_id != 2) {
                return response()->json([
                    'error' => 'Vous n\'avez pas l\'autorisation de modifier !'
                ]);
            } else {
            $service = Service::find($id);

            if (!$service) {
                return response()->json(['error' => 'Service non trouvé'], 404);
            }

            if ($service->libelle != $request->libelle) {
                $p = Service::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Cet service existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            if ($request->departement_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir un departement!',
                ]);
            }

            $service->update([
                'libelle' => $request->libelle,
                'departement_id' => $request->departement_id,
            ]);

            return response()->json([
                'message' => 'Service mis à jour avec succès!',
            ], 200);
        }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Une erreur est survenue : ' . $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = Auth::user();
        if ($user->profil_id != 2) {
            return response()->json([
                'error' => 'Vous n\'avez pas l\'autorisation de supprimer !'
            ]);
        } else {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['error' => 'Service not found!'], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Service supprimé avec success!']);
    }
    }

    public function restaurer($id)
    {

        $service = Service::withTrashed()->find($id);

        if ($service) {

            $service->restore();

            return response()->json([
                'message' => 'Le service a été restauré avec succès!',
                'service' => $service
            ]);
        } else {
            return response()->json([
                'error' => 'Le service n\'a pas été trouvé!',
            ], 404);
        }
    }

}
