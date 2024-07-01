<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\ControleImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Log;

class ImportController extends Controller
{

    public function import(Request $request)
    {
        {
            try {
                $request->validate([
                    'file' => 'required|mimes:xlsx,xls',
                ]);

                $file = $request->file('file');

                Excel::import(new ControleImport, $file);

                return response()->json(['message' => 'File imported successfully!']);
            } catch (\Exception $e) {
                Log::error('Error importing file: ' . $e->getMessage());
                return response()->json(['error' => 'Error importing file'], 500);
            }
        }
    }

}
