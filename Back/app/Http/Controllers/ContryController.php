<?php

namespace App\Http\Controllers;

use App\Models\Contry;
use Illuminate\Http\Request;

class ContryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'pays' => Contry::all(),
            'archives' => Contry::onlyTrashed()->get()
        ]);
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
            $p =Contry::where('libelle', $request->libelle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Cet Pays existe déjà!',
                ]);
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            Contry::create([
                'libelle' => $request->libelle,
            ]);

            return response()->json([
                'message' => "Le pays a été crée avec succès!",
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
    public function show(Contry $contry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contry $contry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $contry = Contry::find($id);

            if (!$contry) {
                return response()->json(['error' => 'pays non trouvé!'], 404);
            }

            if ($contry->libelle != $request->libelle) {
                $p = Contry::where('libelle', $request->libelle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Ce pays existe déjà!',
                    ]);
                }
            }

            if ($request->libelle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            $contry->update([
                'libelle' => $request->libelle,

            ]);

            return response()->json([
                'message' => 'Le type de controle est mise à jour avec succès!',
                'data' => $contry,
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
    public function destroy(Contry $contry)
    {
         
        $contry = Contry::find($id);

        if (!$contry) {
            return response()->json(['error' => 'le pays non trouvé!'], 404);
        }

        $contry->delete();

        return response()->json(['message' => 'le pays supprimé avec succes!']);
    }

    public function restaurer($id)
    {
        $contry = Contry::onlyTrashed()->find($id);

        if ($contry ) {
            $contry->restore();
            return response()->json([
                'message' => 'Le pays a été restauré avec succès!',
                'contry' => $contry
            ]);
        } else {
            return response()->json([
                'error' => 'Le pays n\'a pas été trouvé!',
            ], 404);
        }
    }

}
