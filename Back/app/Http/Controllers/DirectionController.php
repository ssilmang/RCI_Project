<?php

namespace App\Http\Controllers;

use App\Models\Direction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    public function store(Request $request){
        try {
            $user = Auth::user();
            if ($user->profil_id != 2) {
                return response()->json([
                    'error' => 'Vous n\'avez pas l\'autorisation d\'ajouter !'
                ]);
            } else {
            $p = Direction::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cette direction existe déjà!',
                ]);
            }

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
    public function update(Request $request, string $id)
    {

    try {
            $user = Auth::user();
            if ($user->profil_id != 2) {
                return response()->json([
                    'error' => 'Vous n\'avez pas l\'autorisation de modifier !'
                ]);
            } else {

        $direction = Direction::find($id);

        if ($direction->libelle!=$request->libelle) {
            $p = Direction::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cette direction existe déjà!',
                ]);
            }
        }

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
        $direction = Direction::find($id);

        if (!$direction) {
            return response()->json(['error' => 'Direction not found'], 404);
        }

        $direction->delete();


        return response()->json(['message' => 'Direction deleted successfully']);
    }
    }

    public function restaurer($id)
    {
        $direction = Direction::withTrashed()->find($id);

        if ($direction) {

            $direction->restore();

            return response()->json([
                'message' => 'La direction a été restaurée avec succès.',
                'direction' => $direction
            ]);
        } else {
            return response()->json([
                'error' => 'La direction n\'a pas été trouvée.',
            ], 404);
        }

        return response()->json(['message' => 'Direction supprimé avec success']);
    }

}
