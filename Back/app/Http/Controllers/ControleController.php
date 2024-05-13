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
        return Controle::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $test = Controle::where('nom', $request->nom)->where('code', $request->code)->first();
            if ($test) {
                return response()->json(['error' => 'Le controle a déjà été créé!']);
            }
            Controle::create([
                'nom' => $request->nom,
                'code' => $request->code,
            ]);
            return response()->json(['message' => 'Le controle a été créé avec succès!']);

        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try{
            $controle = Controle::findOrFail($id);

            if ($controle->nom != $request->nom) {
                $test = Controle::where('nom', $request->nom)->first();
                if ($test) {
                    return response()->json(['error' => 'Ce controle a déjà été créé!']);
                }
            }

            $controle->update([
                'nom' => $request->nom,
                'code' => $request->code
            ]);
            return response()->json(['message' => 'Le controle a été mis à jour avec succès!']);

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
        if (!$controle) {
            return response()->json(['error' => "Ce controle n'a pas été trouvé!"]);
        }
        $controle->delete();
        return response()->json(['message' => 'Le controle a été supprimé avec succès']);
    }
}
