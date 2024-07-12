<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TypeControle;
use Illuminate\Support\Facades\Auth;

class TypeControleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'types' => TypeControle::all(),
            'archives' => TypeControle::onlyTrashed()->get()
        ]);
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
            $p = TypeControle::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cet type de controle existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            TypeControle::create([
                'libelle' => $request->libelle,
            ]);

            return response()->json([
                'message' => "Le type de controle a été crée avec succès!",
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
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();
            if ($user->profil_id != 2) {
                return response()->json([
                    'error' => 'Vous n\'avez pas l\'autorisation de modifier !'
                ]);
            } else {
            $type_controle = TypeControle::find($id);

            if (!$type_controle) {
                return response()->json(['error' => 'type de controle non trouvé!'], 404);
            }

            if ($type_controle->libelle != $request->libelle) {
                $p = TypeControle::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Ce type de controle existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            $type_controle->update([
                'libelle' => $request->libelle,
            ]);

            return response()->json([
                'message' => 'Le type de controle est mise à jour avec succès!',
                'data' => $type_controle,
            ]);
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
    public function destroy($id)
    {
        $user = Auth::user();
        if ($user->profil_id != 2) {
            return response()->json([
                'error' => 'Vous n\'avez pas l\'autorisation de supprimer !'
            ]);
        } else {
        $type_controle = TypeControle::find($id);
        if (!$type_controle) {
            return response()->json(['error' => 'type_controle non trouvé!'], 404);
        }
        $type_controle->delete();
        return response()->json(['message' => 'type_controle supprimé avec succes!']);
    }
    }

    public function restaurer($id)
    {
        $type_controle = TypeControle::onlyTrashed()->find($id);

        if ($type_controle ) {
            $type_controle->restore();
            return response()->json([
                'message' => 'Le type_controle a été restauré avec succès!',
                'risque' => $type_controle
            ]);
        } else {
            return response()->json([
                'error' => 'Le type_controle n\'a pas été trouvé!',
            ], 404);
        }
    }

}
