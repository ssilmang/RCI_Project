<?php

namespace App\Http\Controllers;

use App\Models\Data;
use Illuminate\Http\Request;
use App\Http\Requests\StoreDataRequest;
use App\Http\Requests\UpdateDataRequest;
use App\Http\Resources\ControleResource;

class DataController extends Controller
{
    public function index()
    {
        // $controles = Data::with('type')->get();
        // $archives = Data::onlyTrashed()->with('type')->get();

        // return response()->json([
        //     'data' => ControleResource::collection($controles),
        //     'archives' => ControleResource::collection($archives)
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $p = Data::where('nom_controle', $request->nom_controle)->first();
            if ($p) {
                return response()->json([
                    'error' => 'Ce controle existe déjà!',
                ]);
            }

            if ($request->nom_controle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            Data::create([
                'nom_controle' => $request->nom_controle,
                'code' => $request->code,
                'objectif' => $request->objectif,
                'descriptif' => $request->descriptif,
                'type_controle_id' => $request->type,
            ]);

            return response()->json([
                'message' => "Le controle a été crée avec succès!",
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => 'Une erreur est survenue : ' . $th->getMessage(),
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $data = Data::find($id);

            if (!$data) {
                return response()->json(['error' => 'Controle non trouvé!'], 404);
            }

            if ($data->nom_controle != $request->nom_controle) {
                $p = Data::where('nom_controle', $request->nom_controle)->first();
                if ($p) {
                    return response()->json([
                        'error' => 'Ce contorle existe déjà!',
                    ]);
                }
            }

            if ($request->nom_controle == null) {
                return response()->json([
                    'error' => 'Veuillez entrer un libellé valide!',
                ]);
            }

            $data->update([
                'nom_controle' => $request->nom_controle,
                'code' => $request->code,
                'objectif' => $request->objectif,
                'descriptif' => $request->descriptif,
                'type_controle_id' => $request->type,
            ]);

            return response()->json([
                'message' => 'Le controle est mise à jour avec succès!',
                'data' => $data,
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
    public function destroy($id)
    {
        $data = Data::find($id);

        if (!$data) {
            return response()->json(['error' => 'Controle non trouvé!'], 404);
        }

        $data->delete();

        return response()->json(['message' => 'Controle supprimé avec succes!']);
    }

    public function restaurer($id)
    {
        $data = Data::onlyTrashed()->find($id);

        if ($data) {
            $data->restore();
            return response()->json([
                'message' => 'Le controle a été restauré avec succès!',
                'data' => $data
            ]);

        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

}
