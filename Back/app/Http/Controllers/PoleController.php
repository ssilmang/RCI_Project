<?php

namespace App\Http\Controllers;

use App\Models\Pole;
use Illuminate\Http\Request;

class PoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $poles = Pole::with('direction')->get();
        return response()->json($poles);
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
                'libelle' => 'required|string|max(255)', // Limite de caractères pour "libelle"
                'direction_id' => 'required|exists:directions,id', // La direction doit exister
            ]);
    
          
            $pole = Pole::create($validated);
    
          
            return response()->json([
                'message' => 'Pôle créé avec succès!',
                'data' => $pole, 
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
      
        $pole = Pole::find($id);

        if (!$pole) {
            
            return response()->json(['error' => 'Pôle non trouvé'], 404);
        }

       
        $validated = $request->validate([
            'libelle' => 'required|string|max(255)', 
            'direction_id' => 'required|exists:directions,id',
        ]);

        
        $pole->update($validated);

       
        return response()->json([
            'message' => 'Pôle mis à jour avec succès!',
            'data' => $pole, 
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
       
        $pole = Pole::find($id);

        if (!$pole) {
            return response()->json(['error' => 'Pole non trouve'], 404);
        }

        $pole->delete();

        return response()->json(['message' => 'Pole supprimer avec succes']);
    }
    
    public function restaurer($id)
    {
        
        $pole = Pole::withTrashed()->find($id);

        if ($pole) {
           
            $pole->restore();

            return response()->json([
                'message' => 'Le pole a été restaurée avec succès.',
                'pole' => $pole
            ]);
        } else {
            return response()->json([
                'message' => 'Len\'a pas été trouvée.',
            ], 404);
        }
    }
    }

