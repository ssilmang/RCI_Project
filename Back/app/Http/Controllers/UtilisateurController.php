<?php

namespace App\Http\Controllers;

use App\Http\Resources\UtilisateurResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
class UtilisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return User::all();
        $users = User::all();
        return UtilisateurResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            if (!$request->matricule || $request->matricule == null) {
                return response()->json(['error' => 'Veuillez saisir la matricule!']);
            }

            if ($request->direction_id == 0 || $request->direction_id == null) {
                return response()->json(['error' => 'Veuillez choisir une direction!']);
            }

            if (!$request->password || $request->password == null) {
                return response()->json(['error' => 'Veuillez saisir un password par defaut!']);
            }

            $user = User::where('email', $request->email)->first();
            if ($user) {
                return response()->json(['error' => 'Cet email a déjà été attribué!']);
            }

            $user = User::where('matricule', $request->matricule)->first();
            if ($user) {
                return response()->json(['error' => 'Cet matricule a déjà été attribué!']);
            }

            $utilisateur = User::create([
                'nom_complet' => $request->nom_complet,
                'telephone' => $request->telephone,
                'addresse' => $request->addresse,
                'matricule' => $request->matricule,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'direction_id' => $request->direction_id,
                'service_id' => $request->service_id,
            ]);

            return response()->json([
                'message' => 'Utilisateur créé avec succès!',
                'utilisateur' => $utilisateur,
            ], 201);

        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try
            {
            $utilisateur = User::findOrFail($id);

            if ($utilisateur->email != $request->email) {
                $user = User::where('email', $request->email)->first();
                if ($user) {
                    return response()->json(['error' => 'Cet email a déjà été attribué!']);
                }
            }
            if (!$request->nom_complet || $request->nom_complet == null) {
                return response()->json(['error' => 'Veuillez saisir le nom complet!']);
            }

            if (!$request->matricule || $request->matricule == null) {
                return response()->json(['error' => 'Veuillez saisir la matricule!']);
            }

            if ($request->direction_id == 0 || $request->direction_id == null) {
                return response()->json(['error' => 'Veuillez choisir une direction!']);
            }

            if (!$request->password || $request->password == null) {
                return response()->json(['error' => 'Veuillez saisir un password par defaut!']);
            }

            $utilisateur->update([
                'nom_complet' => $request->nom_complet,
                'telephone' => $request->telephone,
                'addresse' => $request->addresse,
                'matricule' => $request->matricule,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'direction_id' => $request->direction_id,
                'service_id' => $request->service_id,
            ]);

            return response()->json(['message' => 'Utilisateur mis à jour avec succès!']);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
         $utilisateur = User::findOrFail($id);
         $utilisateur->delete();
         return response()->json(['message' => 'Utilisateur supprimé avec succès!']);
    }

    public function restaurer($id)
    {
        $user = User::withTrashed()->find($id);
        if ($user) {
            $user->restore();
            return response()->json([
                'message' => 'L\'utilisateur a été restauré avec succès!',
                'utilisateur' => $user
            ]);
        } else {
            return response()->json([
                'error' => 'L\'utilisateur n\'a pas été trouvé!',
            ], 404);
        }
    }
    
}
