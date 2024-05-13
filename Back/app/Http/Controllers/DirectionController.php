<?php

namespace App\Http\Controllers;

use App\Models\Direction;
use Illuminate\Http\Request;

class DirectionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Direction::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

    try {
        if ($request->libelle == null) {
           return response()->json([
            'error' => 'Veuillez saisir un libellé valide!',
           ]);
        }

        Direction::create([
            'libelle' => $request->libelle
        ]);

        return response()->json([
            'message' => 'Direction créée avec succès!',
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

        $direction = Direction::find($id);

        if (!$direction) {
            return response()->json(['error' => 'Direction non trouvée'], 404);
        }

        if ($request->libelle == null) {
            return response()->json([
                'error' => 'Veuillez saisir un libellé valide!',
            ]);
        }

        $direction->update([
            'libelle' => $request->libelle
        ]);

        return response()->json([
            'message' => 'Direction mise à jour avec succès!',
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
        $direction = Direction::find($id);

        if (!$direction) {
            return response()->json(['error' => 'Direction not found'], 404);
        }

        $direction->delete();

        return response()->json(['message' => 'Direction supprimé avec success']);
    }

}

