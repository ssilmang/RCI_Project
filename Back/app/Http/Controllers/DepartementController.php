<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Departement::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $p = Departement::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Ce departement existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            if ($request->direction_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir une direction!',
                ]);
            }

            if ($request->pole_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir un pole!',
                ]);
            }

            Departement::create([
                'libelle' => $request->libelle,
                'direction_id' => $request->direction_id,
                'pole_id' => $request->pole_id
            ]);


            return response()->json([
                'message' => 'Département créé avec succès!',
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

            $departement = Departement::find($id);

            if (!$departement) {
                return response()->json(['error' => 'Département non trouvé'], 404);
            }

            if ($departement->libelle != $request->libelle) {
                $p = Departement::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Ce departement existe déjà!',
                    ]);
                }

            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            if ($request->direction_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir une direction!',
                ]);
            }

            if ($request->pole_id == null) {
                return response()->json([
                    'error' => 'Veuillez choisir un pole!',
                ]);
            }

            $departement->update([
                'libelle' => $request->libelle,
                'direction_id' => $request->direction_id,
                'pole_id' => $request->pole_id
            ]);


            return response()->json([
                'message' => 'Département mis à jour avec succès!',
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
        $departement = Departement::find($id);

        if (!$departement) {
            return response()->json(['error' => 'Departement non trouvé!'], 404);
        }

        $departement->delete();


        return response()->json(['message' => 'Departement supprimer avec succes']);
    }

    public function restaurer($id)
    {

        $departement = Departement::withTrashed()->find($id);

        if ($departement) {

            $departement->restore();

            return response()->json([
                'message' => 'Le departement a été restaurée avec succès.',
                'departemnt' => $departement
            ]);
        } else {
            return response()->json([
                'error' => 'Le departement  n\'a pas été trouvée.',
            ], 404);
        }

      return response()->json(['message' => 'Departement supprimé avec succes!']);

    }

    }






