<?php

namespace App\Http\Controllers;

use App\Models\Risque;
use Illuminate\Http\Request;

class RisqueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $risques = Risque::all();
        return DataResource::collection($risques);
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
            $p = Risque::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cet Risques existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            Risque::create([
                'libelle' => $request->libelle,
            ]);

            return response()->json([
                'message' => "Le Risque a été crée avec succès!",
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
    public function show(Risque $risque)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Risque $risque)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Risque $risque)
    {
        try {

            $risque = Risque::find($id);

            if (!$risque) {
                return response()->json(['error' => 'Risque non trouvée'], 404);
            }

            if ($risque->libelle != $request->libelle) {
                $p = Risque::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Cet Risque existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            

            $risque->update([
                'libelle' => $request->libelle,
    
            ]);

            return response()->json([
                'message' => 'Activité mise à jour avec succès!',
                'data' => $risque,
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
    public function destroy(Risque $risque)
    {
        $risque = Risque::find($id);

        if (!$risque) {
            return response()->json(['error' => 'Risque non trouvé!'], 404);
        }

        $risque->delete();

        return response()->json(['message' => 'Risque supprimé avec succes!']);
    }
    
    public function restaurer($id)
    {

        $risque = Risque::withTrashed()->find($id);

        if ($risque ) {

            $risque ->restore();

            return response()->json([
                'message' => 'Le risque a été restaurée avec succès.',
                'risque' => $risque 
            ]);
        } else {
            return response()->json([
                'error' => 'Le risque n\'a pas été trouvée.',
            ], 404);
        }
    }
}
