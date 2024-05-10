<?php

namespace App\Http\Controllers;

use App\Models\Activite;
use Illuminate\Http\Request;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $activites = Activite::with('service')->get();
        return response()->json($activites);
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
      
    $validated = $request->validate([
        'libelle' => 'required|string|max(255)', 
        'service_id' => 'required|exists:services,id', 
    ]);

    try {
      
        $activite = Activite::create($validated);

        return response()->json([
            'message' => 'L\'activité a été créée avec succès!',
            'data' => $activite, 
        ], 201);
    } catch (\Throwable $th) {
        
        return response()->json([
            'error' => 'Une erreur est survenue : ' . $th->getMessage(),
        ], 500); // 
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
            
            $activite = Activite::find($id);
    
            if (!$activite) {
                
                return response()->json(['error' => 'Activité non trouvée'], 404);
            }
    
           
            $validated = $request->validate([
                'libelle' => 'required|string|max(255)', 
                'service_id' => 'required|exists:services,id', 
            ]);
    
            
            $activite->update($validated);
    
         
            return response()->json([
                'message' => 'Activité mise à jour avec succès!',
                'data' => $activite, 
            ]);
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
        $activite = Activite::find($id);

        if (!$activite) {
            return response()->json(['error' => 'activite non trouve'], 404);
        }

        $activite->delete();

        return response()->json(['message' => 'Activite supprimer avec succes']);
    }
    }

