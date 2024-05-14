<?php

namespace App\Http\Controllers;

use App\Models\Departement;
use Illuminate\Http\Request;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departements = Departement::with(['direction', 'pole'])->get();
        return response()->json($departements);
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
            'libelle' => 'required|string|max(255)', 
            'direction_id' => 'required|exists:directions,id',
            'pole_id' => 'required|exists:poles,id', 
        ]);


        $departement = Departement::create($validated);

      
        return response()->json([
            'message' => 'Département créé avec succès!',
            'data' => $departement, 
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
          
            $departement = Departement::find($id);
    
            if (!$departement) {
             
                return response()->json(['error' => 'Département non trouvé'], 404);
            }

            $validated = $request->validate([
                'libelle' => 'required|string|max(255)', 
                'direction_id' => 'required|exists:directions,id', 
                'pole_id' => 'required|exists:poles,id', 
            ]);
    
          
            $departement->update($validated);
    
          
            return response()->json([
                'message' => 'Département mis à jour avec succès!',
                'data' => $departement, 
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
        $departement = Departement::find($id);

        if (!$departement) {
            return response()->json(['error' => 'Departement non trouver'], 404);
        }

        $departement->delete();

        return response()->json(['message' => 'Departement supprimer avec succes']);
    }
    
    public function restaurer($id)
    {
        
        $departement = Departemnt::withTrashed()->find($id);

        if ($departement) {
           
            $departement->restore();

            return response()->json([
                'message' => 'Le departement a été restaurée avec succès.',
                'departemnt' => $departement
            ]);
        } else {
            return response()->json([
                'message' => 'Le departement  n\'a pas été trouvée.',
            ], 404);
        }
    }
    
    }

