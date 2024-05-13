<?php

namespace App\Http\Controllers;

use App\Models\Pole;
use Illuminate\Http\Request;

class PoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Pole::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $p = Pole::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Ce pole existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide',
                ]);
            }

            Pole::create([
                'libelle' => $request->libelle,
                'direction_id' => $request->direction_id
            ]);


            return response()->json([
                'message' => 'Pôle créé avec succès!',
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

            $pole = Pole::find($id);

            if ($pole->libelle != $request->libelle) {
                $p = Pole::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Ce pole existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            if ($request->direction_id == 0 || $request->direction_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir une direction!',
                ]);
            }

            if (!$pole) {
                return response()->json(['error' => 'Pôle non trouvé!'], 404);
            }

            $pole->update([
                'libelle' => $request->libelle,
                'direction_id' => $request->direction_id
            ]);


            return response()->json([
                'message' => 'Pôle mis à jour avec succès!',
            ], 200);

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

        $pole = Pole::find($id);

        if (!$pole) {
            return response()->json(['error' => 'Pole non trouvé!'], 404);
        }

        $pole->delete();

        return response()->json(['message' => 'Pole supprimé avec succes!']);
    }
    }

