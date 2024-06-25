<?php

namespace App\Http\Controllers;


use App\Models\Controle;
use Illuminate\Http\Request;
use App\Imports\ControleImport;

class ImportController extends Controller
{
    
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls', // Validez le type de fichier
        ]);

        Excel::import(new ControleImport, $request->file('file'));

        return redirect()->back()->with('success', 'Importation réussie !');
    }
}
