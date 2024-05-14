<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::with('departement')->get(); // Obtenir tous les services avec leurs départements
        return response()->json($services);
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
                'departement_id' => 'required|exists:departements,id', 
            ]);
    
          
            $service = Service::create($validated);
    
            return response()->json([
                'message' => 'Service créé avec succès!',
                'data' => $service,
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
        
        $service = Service::find($id);

        if (!$service) {
            
            return response()->json(['error' => 'Service non trouvé'], 404);
        }

        $validated = $request->validate([
            'libelle' => 'required|string|max(255)', 
            'departement_id' => 'required|exists:departements,id', 
        ]);

      
        $service->update($validated);

        return response()->json([
            'message' => 'Service mis à jour avec succès!',
            'data' => $service, 
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
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        $service->delete();

        return response()->json(['message' => 'Service deleted successfully']);
    }
    
    public function restaurer($id)
    {
        
        $service = Service::withTrashed()->find($id);

        if ($service) {
           
            $service->restore();

            return response()->json([
                'message' => 'Le service a été restaurée avec succès.',
                'service' => $service
            ]);
        } else {
            return response()->json([
                'message' => 'Le service n\'a pas été trouvée.',
            ], 404);
        }
    }
}
