<?php

namespace App\Http\Controllers;

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
        $utilisateurs = User::all();
        return response()->json($utilisateurs);
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
            'email' => $request->email,
            'matricule' => $request->matricule,
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
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $utilisateur = User::findOrFail($id);
        return response()->json($utilisateur);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
      $utilisateur = User::findOrFail($id);
        return response()->json($utilisateur);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try
        {

        
        $utilisateur = User::findOrFail($id);

        $user = User::where('email', $request->email)->first();

        $utilisateur->update([
            'nom_complet'=> $request->nom_complet,
            'email'=> $request->email,
            'matricule'=> $request->matricule,
            'direction_id' => $request->direction_id,
            'service_id' => $request->service_id,
            'password' => bcrypt($request->password)
        ]);

        return response()->json(['message' => 'Utilisateur mis à jour avec succès!', 'utilisateur' => $utilisateur]);
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
                'message' => 'L\'utilisateur a été restaurée avec succès.',
                'utilisateur' => $user
            ]);
        } else {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvée.',
            ], 404);
        }
    }
}
