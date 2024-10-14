<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\ControleImport;
use Rap2hpoutre\FastExcel\FastExcel;
// use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportController extends Controller
{
   protected $import;
    public function __construct(ControleImport $import){

$this->import=$import;

    }
    public function importer(Request $request)
    {
     
        $request->validate([
            'file' => 'required|mimes:xlsx|max:2048',
        ]);
        $data=new FastExcel();
        $files = $request->file;
        $file = $request->file('file');
        $donnees = $data->import($file);
        foreach ($donnees as $key => $value) {

             $this->import->model($value);
        
        }
          return response()->json($donnees);
        // return response()->json($donnees);
        // $spreadsheet = IOFactory::load($file->getRealPath());
        // $sheet = $spreadsheet->getSheetByName('SOMMAIRE'); // Charger la feuille spécifique
        // $data = $sheet;
        // return response()->json($data);
        // dd($data); 
        // $donneesSousFichier = $data->sheet('SOMMAIRE')->import($file);
        // $sheetNames = ['SOMMAIRE', 'CRTL KIT DE CTRL', 'CTRL INV  PWC SOX']; // Remplacez par les noms réels des feuilles
        // $toutesDonnees=[];
        // foreach ($sheetNames as $sheetName) {
        //     try {
        //         // Importer les données de la feuille courante
        //         $donneesSousFichier = $data->sheet($sheetName)->import($file);
        //         array_walk_recursive($donneesSousFichier, function (&$item) {
        //             if (is_string($item)) {
        //                 $item = utf8_encode($item);
        //             }
        //         });
        //         // Ajouter les données de la feuille courante au tableau global
        //         $toutesDonnees[$sheetName] = $donneesSousFichier;
        //     } catch (\Exception $e) {
        //         // Gérer les erreurs d'importation pour une feuille spécifique
        //         return response()->json(['error' => 'Erreur lors de l\'importation de la feuille ' . $sheetName . ' : ' . $e->getMessage()], 500);
        //     }
        // }
        // return response()->json( $toutesDonnees, [], JSON_UNESCAPED_UNICODE);
        // foreach ($donnes as $key => $value) {
           
            
        }
        // Excel::import(new ControleImport, $request->file('file'));

        // return back()->with('success', 'Données importer avec succes!');
    }


