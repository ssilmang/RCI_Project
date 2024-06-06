<?php

namespace App\Http\Controllers;

// use PDF;
use App\Http\Resources\DataResource;
use App\Models\Controle;
use Illuminate\Http\Request;

class ControleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'controles' => DataResource::collection(Controle::all()),
            'archives' => DataResource::collection(Controle::onlyTrashed()->get())
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // if ($request->hasFile('fichiers')) {
            //     $pdfContent = file_get_contents($request->file('fichiers')->getRealPath());
            //     $validated['fichiers'] = $pdfContent;
            // }
            if (!$request->user_id || $request->user_id == null) {
                return response()->json([
                  'error' => 'Veuillez choisir le porteur!'
                ]);
            }
            if (!$request->direction_id || $request->direction_id == null) {
                return response()->json([
                  'error' => 'Veuillez choisir la direction!'
                ]);
            }
            if (!$request->preuve || $request->preuve == null) {
                return response()->json([
                    'error' => 'Veuillez renseigner la preuve demandée!'
                ]);
            }
            if (!$request->objectif || $request->objectif == null) {
                return response()->json([
                    'error' => "Veuillez renseigner l'objectif du controle!"
                ]);
            }
            if (!$request->nom || $request->nom == null) {
                return response()->json([
                    'error' => "Veuillez renseigner le nom du controle!"
                ]);
            }

            if ($request->hasFile('fichier')) {
                $filePath = $request->file('fichier')->store('fichiers', 'public');
            }

            Controle::create([
                'code' => $request->code,
                'objectif' => $request->objectif,
                'periodicite' => $request->periodicite,
                'exhaustivite' => $request->exhaustivite,
                'preuve' => $request->preuve,
                'etat' => $request->etat,
                'nom' => $request->nom,
                'commentaire' => $request->commentaire,
                'descriptif' => $request->descriptif,
                'date_ajout' => now(),
                'risque_id' => $request->risque_id,
                'direction_id' => $request->direction_id,
                'service_id' => $request->service_id,
                'pole_id' => $request->pole_id,
                'activite_id' => $request->activite_id,
                'departement_id' => $request->departement_id,
                'user_id' => $request->user_id,
                'validate' => 'non validé',
                'fichier' => $filePath
            ]);

            return response()->json([
                'message' => 'Contrôle créé avec succès!',
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
    public function update(Request $request, $id){
      try {
        $pilotage = Controle::find($id);
        // return $request;

        if (!$pilotage) {
            return response()->json(['error' => 'Controle non trouvé!'], 404);
        }
        if (!$request->user_id || $request->user_id == null) {
            return response()->json([
            'error' => 'Veuillez choisir le porteur!'
            ]);
        }
        if (!$request->direction_id || $request->direction_id == null) {
            return response()->json([
            'error' => 'Veuillez choisir la direction!'
            ]);
        }
        if (!$request->preuve || $request->preuve == null) {
            return response()->json([
                'error' => 'Veuillez renseigner la preuve demandée!'
            ]);
        }
        if (!$request->objectif || $request->objectif == null) {
            return response()->json([
                'error' => "Veuillez renseigner l'objectif du controle!"
            ]);
        }
        if (!$request->nom || $request->nom == null) {
            return response()->json([
                'error' => "Veuillez renseigner le nom du controle!"
            ]);
        }

        if ($request->hasFile('fichier')) {
            $filePath = $request->file('fichier')->store('fichiers', 'public');

          $pilotage->update([
              'code' => $request->code,
              'objectif' => $request->objectif,
              'periodicite' => $request->periodicite,
              'exhaustivite' => $request->exhaustivite,
              'preuve' => $request->preuve,
              'etat' => $request->etat,
              'fichier' => $filePath,
              'nom' => $request->nom,
              'commentaire' => $request->commentaire,
              'descriptif' => $request->descriptif,
              'archived_at' => $request->archived_at,
              'risque_id' => $request->risque_id,
              'direction_id' => $request->direction_id,
              'service_id' => $request->service_id,
              'pole_id' => $request->pole_id,
              'activite_id' => $request->activite_id,
              'departement_id' => $request->departement_id,
              'user_id' => $request->user_id,
          ]);
        }else{
            $pilotage->update([
                'code' => $request->code,
                'objectif' => $request->objectif,
                'periodicite' => $request->periodicite,
                'exhaustivite' => $request->exhaustivite,
                'preuve' => $request->preuve,
                'etat' => $request->etat,
                'nom' => $request->nom,
                'commentaire' => $request->commentaire,
                'descriptif' => $request->descriptif,
                'archived_at' => $request->archived_at,
                'risque_id' => $request->risque_id,
                'direction_id' => $request->direction_id,
                'service_id' => $request->service_id,
                'pole_id' => $request->pole_id,
                'activite_id' => $request->activite_id,
                'departement_id' => $request->departement_id,
                'user_id' => $request->user_id,
            ]);
        }

        return response()->json([
            'message' => 'Controle mise à jour avec succès!',
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
    public function destroy($id)
    {
        $pilotage = Controle::find($id);

        if (!$pilotage) {
            return response()->json(['error' => 'Controle not found!'], 404);
        }
        $pilotage->update([
            'archived_at' => now()
        ]);

        $pilotage->delete();

        return response()->json(['message' => 'Controle deleted successfully!']);
    }

    public function restaurer($id)
    {
        $pilotage =Controle::onlyTrashed()->find($id);
        if ($pilotage) {
            $pilotage->restore();
            return response()->json([
                'message' => 'Le controle a été restauré avec succès!',
                'controle' => $pilotage
            ]);

        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

    public function validated($id)
    {
        $pilotage =Controle::find($id);
        if ($pilotage) {
            $pilotage->validate = 'Validé';
            $pilotage->save();

            return response()->json([
                'message' => 'Le controle a été validé avec succès!',
                'controle' => $pilotage
            ]);

        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

    public function invalidated($id)
    {
        $pilotage = Controle::find($id);
        if ($pilotage) {
            $pilotage->validate = 'Non validé';
            $pilotage->save();

            return response()->json([
                'message' => 'Le controle a été validé avec succès!',
                'controle' => $pilotage
            ]);
        } else {
            return response()->json([
                'error' => 'Le controle n\'a pas été trouvé!',
            ], 404);
        }
    }

    public function downloadFile(Request $request)
    {
        try {
            $path = $request->file('file')->store('files', 'public');

            return response()->json([
                'success' => true,
                'message' => 'Avatar uploaded successfully.',
                'path' => $path
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'There was an error uploading the avatar.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // public function viewPdf($id)
    // {
    //     $pilotage = Controle::findOrFail($id);
    //     $pdfContent = $pilotage->fichier;
    //     return response($pdfContent)
    //     ->header('Content-Type', 'application/pdf')
    //     ->header('Content-Disposition', 'inline; filename="file.pdf"');
    // }

    // public function exportPDF()
    // {
    //     $pdf = PDF::loadView('export-pdf', $data);
    //     return $pdf->download('exported-pdf.pdf');
    // }

}
