<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PoleController;
use App\Http\Controllers\RisqueController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ControleController;
use App\Http\Controllers\PilotageController;
use App\Http\Controllers\DirectionController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\UtilisateurController;


Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/user', function(Request $request) {
        return $request->user(); // Retourne l'utilisateur connecté
    });

    // Route de déconnexion protégée
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Définition de la route pour récupérer tous les utilisateurs
Route::get('/utilisateur/all', [UtilisateurController::class, 'index']);
Route::post('/utilisateur/add', [UtilisateurController::class, 'store']);
Route::put('/utilisateur/update/{id}', [UtilisateurController::class, 'update']);
Route::delete('/utilisateur/delete/{id}', [UtilisateurController::class, 'destroy']);

//routers for risques//
Route::get('/risque/all', [RisqueController::class, 'index']);
Route::post('/risque/add', [RisqueController::class, 'store']);
Route::put('/risque/update/{id}', [RisqueController::class, 'update']);
Route::delete('/risque/delete/{id}', [RisqueController::class, 'destroy']);
Route::get('/risque/restaurer/{id}', [RisqueController::class, 'restaurer']);

//routes for login//
Route::post('/login',[AuthController::class,'login']);

//routes for direction//
Route::get('/direction/all', [DirectionController::class, 'index']);
Route::post('/direction/add', [DirectionController::class, 'store']);
Route::put('/direction/update/{id}', [DirectionController::class, 'update']);
Route::delete('/direction/delete/{id}', [DirectionController::class, 'destroy']);

//routes for Activities//
Route::get('/activite/all', [ActiviteController::class, 'index']);
Route::post('/activite/add', [ActiviteController::class, 'store']);
Route::put('/activite/update/{id}', [ActiviteController::class, 'update']);
Route::delete('/activite/delete/{id}', [ActiviteController::class, 'destroy']);

//route for Poles//
Route::get('/pole/all', [PoleController::class, 'index']);
Route::post('/pole/add', [PoleController::class, 'store']);
Route::put('/pole/update/{id}', [PoleController::class, 'update']);
Route::delete('/pole/delete/{id}', [PoleController::class, 'destroy']);

//route for departement//
Route::get('/departement/all', [DepartementController::class, 'index']);
Route::post('/departement/add', [DepartementController::class, 'store']);
Route::put('/departement/update/{id}', [DepartementController::class, 'update']);
Route::delete('/departement/delete/{id}', [DepartementController::class, 'destroy']);

//routes for service//
Route::get('/service/all', [ServiceController::class, 'index']);
Route::post('/service/add', [ServiceController::class, 'store']);
Route::put('/service/update/{id}', [ServiceController::class, 'update']);
Route::delete('/sevice/delete/{id}', [ServiceController::class, 'destroy']);
Route::delete('/service/delete/{id}', [ServiceController::class, 'destroy']);

//routes for controle//
Route::get('/controle/all', [ControleController::class, 'index']);
Route::post('/controle/add', [ControleController::class, 'store']);
Route::post('/controle/update/{id}', [ControleController::class, 'update']);
Route::delete('/controle/delete/{id}', [ControleController::class, 'destroy']);
Route::get('/controle/restaurer/{id}', [ControleController::class, 'restaurer']);
Route::get('/controle/validated/{id}', [ControleController::class, 'validated']);
Route::get('/controle/invalidated/{id}', [ControleController::class, 'invalidated']);

// routes for desarchivage//

// Route::post('/controle/{id}/restaurer', [PilotageController::class, 'restaurer']);

// routes for fichier telecharger et enregiosdtrer dans la base de donnee//
Route::get('/view-pdf/{id}', [ControleController::class,'viewPdf']);
Route::get('/export-pdf', [ControleController::class,'exportPDF']);

Route::post('/controle/addFile', [ControleController::class, 'downloadFile']);

Route::get('/activites/restaurer/{id}', [ActiviteController::class, 'restaurer']);
// Route::get('/pilotage/restaurer/{id}', [PilotageController::class, 'restaurer']);
Route::get('/service/restaurer/{id}', [ServiceController::class, 'restaurer']);
Route::get('/departement/restaurer/{id}', [DepartementController::class, 'restaurer']);
Route::get('/pole/restaurer/{id}', [PoleController::class, 'restaurer']);
Route::get('/utilisateur/restaurer/{id}', [UtilisateurController::class, 'restaurer']);


