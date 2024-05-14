<?php

namespace App\Http\Controllers;

use App\Models\Controle;
use Illuminate\Http\Request;

class ControleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $controles = Controle::all(); // Récupérer tous les éléments de la table
        return response()->json($controles);
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
        try
        {
        $test = Controle::where('nom', $request->nom)->where('code', $request->code)->first();
        if ($test) {
            return response()->json(['error' => 'Le controle a déjà été créé!']);
        }

        // Créer un nouvel élément dans la base de données
        $controle = Controle::create([
            'nom' => $request->nom,
            'code' => $request->code,
        ]);

        return response()->json(['message' => 'Le controle a été créé avec succès!', 'controle' => $controle]);
    } catch (\Throwable $th) {
        return response()->json(['error' => $th->getMessage()]);
    }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{

        
        $controle = Controle::findOrFail($id); // Trouver l'élément

        $test = Controle::where('nom', $request->nom)->where('code', $request->code)->first();
        if ($test) {
            return response()->json(['error' => 'Ce controle a déjà été créé!']);
        }

        // Mettre à jour l'élément
        $controle->update([
            'nom' => $request->nom,
            'code' => $request->code
        ]);

        return response()->json(['message' => 'Le controle a été mis à jour avec succès!', 'controle' => $controle]);
    } catch (\Throwable $th) {
        return response()->json(['error' => $th->getMessage()]);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $controle = Controle::findOrFail($id); 
        $controle->delete(); 
        return response()->json(['message' => 'Le controle a été supprimé avec succès']); 
    }
    
    public function restaurer($id)
    {
        
        $activite = Controle::withTrashed()->find($id);

        if ($controle) {
           
            $controle->restore();

            return response()->json([
                'message' => 'Le controle a été restaurée avec succès.',
                'controle' => $controle
            ]);
        } else {
            return response()->json([
                'message' => 'Le controle n\'a pas été trouvée.',
            ], 404);
        }
    }
}
