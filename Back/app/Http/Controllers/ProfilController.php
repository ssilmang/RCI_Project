<?php

namespace App\Http\Controllers;

use App\Models\Profil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// use App\Http\Controllers\Profil;

class ProfilController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Profil::all();
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
            $user = Auth::user();
            if ($user->profil_id != 2) {
                return response()->json([
                    'error' => 'Vous n\'avez pas l\'autorisation d\'ajouter !'
                ]);
            } else {
            $p = Profil::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Ce profil existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            Profil::create([
                'libelle' => $request->libelle,
            ]);

            return response()->json([
                'message' => 'Profil créé avec succès!',
            ], 201);
        }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Une erreur est survenue lors de la création : ' . $th->getMessage(),
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
            $profil = Profil::find($id);

            if (!$profil) {
                return response()->json(['error' => 'Profil non trouvé!'], 404);
            }

            // if ($profil->libelle != $request->libelle) {
            //     $p = Profil::where('libelle', $request->libelle)->first();
            //     if ($p) {
            //         return response()->json([
            //             'error' => 'Cet profil existe déjà!',
            //         ]);
            //     }
            // }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            $profil->update([
                'libelle' => $request->libelle,

            ]);

            return response()->json([
                'message' => 'Le profil est mise à jour avec succès!',
                'data' => $profil,
            ]);
        }
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Une erreur est survenue lors de la mise à jour : ' . $th->getMessage(),
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
        $profil = Profil::find($id);

        if (!$profil ) {
            return response()->json(['error' => 'Profil non trouvé!'], 404);
        }

        $$profil->delete();

        return response()->json(['message' => 'Profil supprimé avec succes!']);
    }
    }

    public function restaurer($id)
    {
        $profil = Profil::withTrashed()->find($id);

        if ($profil) {

            $$profil->restore();

            return response()->json([
                'message' => 'Le profil a été restaurée avec succès!',
                'profil' => $profil
            ]);
        } else {
            return response()->json([
                'error' => 'Le profil n\'a pas été trouvé!',
            ], 404);
        }
    }
}
