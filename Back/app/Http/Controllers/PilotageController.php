<?php

namespace App\Http\Controllers;

use App\Models\Pilotage;
use Illuminate\Http\Request;

class PilotageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pilotages = Pilotage::with(['controle', 'user'])->get(); 
        return response()->json($pilotages);
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
            
            $validated = $request->validate([
                'controle_id' => 'required|exists:controles,id', 
                'objectif' => 'required|string', 
                'risque_couvert' => 'required|string', 
                'user_id' => 'required|exists:users,id',
                'periodicite' => 'required|string', 
                'exhaustivite' => 'required|string', 
                'preuve' => 'required|string',
                'fichier' => 'required|in:0,1', 
            ]);
    
           
            $pilotage = Pilotage::create($validated);
    
           
            return response()->json([
                'message' => 'Pilotage créé avec succès!',
                'data' => $pilotage,
            ], 201);
        } catch (\Throwable $th) {
         
            return response()->json([
                'error' => 'Une erreur est survenue : ' . $th->getMessage(),
            ], 500);
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
       
    try {
      
        $pilotage = Pilotage::find($id);

        if (!$pilotage) {
            
            return response()->json(['error' => 'Pilotage non trouvé'], 404);
        }


        $validated = $request->validate([
            'controle_id' => 'required|exists:controles,id', 
            'objectif' => 'required|string', 
            'risque_couvert' => 'required|string', 
            'user_id' => 'required|exists:users,id', 
            'periodicite' => 'required|string', 
            'exhaustivite' => 'required|string', 
            'preuve' => 'required|string',
            'fichier' => 'required|in:0,1', 
        ]);

        
        $pilotage->update($validated);

        return response()->json([
            'message' => 'Pilotage miEEFZEFZEFZFFs àdsfdf jour avec succès!',
            'data' => $pilotage,
        ], 200);
    } catch (\Throwable $th) {
        
        return response()->json([
            'error' => 'Une erreur est surveneedfeue : ' . $th->getMessage(),
        ], 500);
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $pilotage = Pilotage::find($id);

        if (!$pilotage) {
            return response()->json(['error' => 'Pilotage not found'], 404);
        }

        $pilotage->delete();

        return response()->json(['message' => 'Pilotage deleted successfully']);
    }
    }

