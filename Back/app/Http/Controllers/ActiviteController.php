<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Activite::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $p = Activite::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cet activité existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            if ($request->service_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir un service!',
                ]);
            }

            Activite::create([
                'libelle' => $request->libelle,
                'service_id' => $request->service_id
            ]);

            return response()->json([
                'message' => "L'activité a été créée avec succès!",
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
    public function update(Request $request, string $id)
    {
        try {

            $activite = Activite::find($id);

            if (!$activite) {
                return response()->json(['error' => 'Activité non trouvée'], 404);
            }

            if ($activite->libelle != $request->libelle) {
                $p = Activite::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Cet activité existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            if ($request->service_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir un service!',
                ]);
            }

            $activite->update([
                'libelle' => $request->libelle,
                'service_id' => $request->service_id
            ]);

            return response()->json([
                'message' => 'Activité mise à jour avec succès!',
                'data' => $activite,
            ]);

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
        $activite = Activite::find($id);

        if (!$activite) {
            return response()->json(['error' => 'Activite non trouvé!'], 404);
        }

        $activite->delete();

        return response()->json(['message' => 'Activite supprimé avec succes!']);
    }

     public function restaurer($id)
    {

        $activite = Activite::withTrashed()->find($id);

        if ($activite) {

            $activite->restore();

            return response()->json([
                'message' => 'L\'activité a été restaurée avec succès.',
                'activite' => $activite
            ]);
        } else {
            return response()->json([
                'error' => 'L\'activité n\'a pas été trouvée.',
            ], 404);
        }
    }
    }

