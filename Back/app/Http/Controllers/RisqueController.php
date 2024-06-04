<?php

namespace App\Http\Controllers;

use App\Http\Resources\DataResource;
use App\Models\Risque;
use Illuminate\Http\Request;

class RisqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Risque::all();
        return response()->json([
            'risques' => Risque::all(),
            'archives' => Risque::onlyTrashed()->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $p = Risque::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cet risque existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            Risque::create([
                'libelle' => $request->libelle,
            ]);

            return response()->json([
                'message' => "Le risque a été crée avec succès!",
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
    public function update(Request $request, $id)
    {
        try {
            $risque = Risque::find($id);

            if (!$risque) {
                return response()->json(['error' => 'Risque non trouvé!'], 404);
            }

            if ($risque->libelle != $request->libelle) {
                $p = Risque::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Cet risque existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            $risque->update([
                'libelle' => $request->libelle,

            ]);

            return response()->json([
                'message' => 'Le risque est mise à jour avec succès!',
                'data' => $risque,
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
    public function destroy($id)
    {
        $risque = Risque::find($id);

        if (!$risque) {
            return response()->json(['error' => 'Risque non trouvé!'], 404);
        }

        $risque->delete();

        return response()->json(['message' => 'Risque supprimé avec succes!']);
    }

    public function restaurer($id)
    {
        $risque = Risque::onlyTrashed()->find($id);

        if ($risque ) {
            $risque ->restore();
            return response()->json([
                'message' => 'Le risque a été restauré avec succès!',
                'risque' => $risque
            ]);
        } else {
            return response()->json([
                'error' => 'Le risque n\'a pas été trouvé!',
            ], 404);
        }
    }

}
