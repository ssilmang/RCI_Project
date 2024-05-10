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
        $directions = Direction::all();
        return response()->json($directions);
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
        // Valider les données de la requête
        $validated = $request->validate([
            'libelle' => 'required|string|max(255)', // Limite de caractères pour le libelle
        ]);

        
        $direction = Direction::create($validated);

      
        return response()->json([
            'message' => 'Direction créée avec succès!',
            'data' => $direction, 
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
        
        $direction = Direction::find($id);

        if (!$direction) {
         
            return response()->json(['error' => 'Direction non trouvée'], 404);
        }

       
        $validated = $request->validate([
            'libelle' => 'required|string|max(255)', 
        ]);

       
        $direction->update($validated);

 
        return response()->json([
            'message' => 'Direction mise à jour avec succès!',
            'data' => $direction,
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

        return response()->json(['message' => 'Direction deleted successfully']);
    }
    }

