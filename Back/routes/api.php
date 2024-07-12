<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\PoleController;
use App\Http\Controllers\ContryController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ProfilController;
use App\Http\Controllers\RisqueController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ActiviteController;
use App\Http\Controllers\ControleController;
use App\Http\Controllers\PilotageController;
use App\Http\Controllers\DirectionController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\UtilisateurController;
use App\Http\Controllers\TypeControleController;



Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/user', function(Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/utilisateur/all', [UtilisateurController::class, 'index']);
    Route::post('/utilisateur/add', [UtilisateurController::class, 'store']);
    Route::put('/utilisateur/update/{id}', [UtilisateurController::class, 'update']);
    Route::delete('/utilisateur/delete/{id}', [UtilisateurController::class, 'destroy']);
    Route::get('/utilisateur/restaurer/{id}', [UtilisateurController::class, 'restaurer']);

    Route::get('/risque/all', [RisqueController::class, 'index']);
    Route::post('/risque/add', [RisqueController::class, 'store']);
    Route::put('/risque/update/{id}', [RisqueController::class, 'update']);
    Route::delete('/risque/delete/{id}', [RisqueController::class, 'destroy']);
    Route::get('/risque/restaurer/{id}', [RisqueController::class, 'restaurer']);

    Route::post('/direction/add', [DirectionController::class, 'store']);
    Route::put('/direction/update/{id}', [DirectionController::class, 'update']);
    Route::delete('/direction/delete/{id}', [DirectionController::class, 'destroy']);

    Route::get('/activite/all', [ActiviteController::class, 'index']);
    Route::post('/activite/add', [ActiviteController::class, 'store']);
    Route::put('/activite/update/{id}', [ActiviteController::class, 'update']);
    Route::delete('/activite/delete/{id}', [ActiviteController::class, 'destroy']);
    Route::get('/activites/restaurer/{id}', [ActiviteController::class, 'restaurer']);

    Route::get('/pole/all', [PoleController::class, 'index']);
    Route::post('/pole/add', [PoleController::class, 'store']);
    Route::put('/pole/update/{id}', [PoleController::class, 'update']);
    Route::delete('/pole/delete/{id}', [PoleController::class, 'destroy']);
    Route::get('/pole/restaurer/{id}', [PoleController::class, 'restaurer']);

    Route::get('/departement/all', [DepartementController::class, 'index']);
    Route::post('/departement/add', [DepartementController::class, 'store']);
    Route::put('/departement/update/{id}', [DepartementController::class, 'update']);
    Route::delete('/departement/delete/{id}', [DepartementController::class, 'destroy']);
    Route::get('/departement/restaurer/{id}', [DepartementController::class, 'restaurer']);

    Route::post('/service/add', [ServiceController::class, 'store']);
    Route::put('/service/update/{id}', [ServiceController::class, 'update']);
    Route::delete('/sevice/delete/{id}', [ServiceController::class, 'destroy']);
    Route::get('/service/restaurer/{id}', [ServiceController::class, 'restaurer']);

    Route::get('/typeControle/all', [TypeControleController::class, 'index']);
    Route::post('/typeControle/add', [TypeControleController::class, 'store']);
    Route::put('/typeControle/update/{id}', [TypeControleController::class, 'update']);
    Route::delete('/typeControle/delete/{id}', [TypeControleController::class, 'destroy']);
    Route::get('/typeControle/restaurer/{id}', [TypeControleController::class, 'restaurer']);

    Route::post('/contry/add', [ContryController::class, 'store']);
    Route::put('/contry/update/{id}', [ContryController::class, 'update']);
    Route::delete('/contry/delete/{id}', [ContryController::class, 'destroy']);
    Route::get('/contry/restaurer/{id}', [ContryController::class, 'restaurer']);

    Route::post('/profil/add', [ProfilController::class, 'store']);
    Route::put('/profil/update/{id}', [ProfilController::class, 'update']);
    Route::delete('/profil/delete/{id}', [ProfilController::class, 'destroy']);
    Route::get('/profil/restaurer/{id}', [ProfilController::class, 'restaurer']);

    Route::get('/controle/all', [ControleController::class, 'index']);
    Route::post('/controle/add', [ControleController::class, 'store']);
    Route::post('/controle/update/{id}', [ControleController::class, 'update']);
    Route::delete('/controle/delete/{id}', [ControleController::class, 'destroy']);
    Route::get('/controle/restaurer/{id}', [ControleController::class, 'restaurer']);
    Route::get('/controle/validated/{id}', [ControleController::class, 'validated']);
    Route::get('/controle/invalidated/{id}', [ControleController::class, 'invalidated']);

    Route::get('/data/all', [DataController::class, 'index']);
    Route::post('/data/add', [DataController::class, 'store']);
    Route::post('/data/update/{id}', [DataController::class, 'update']);
    Route::delete('/data/delete/{id}', [DataController::class, 'destroy']);
    Route::get('/data/restaurer/{id}', [DataController::class, 'restaurer']);

    Route::post('/import', [ControleController::class, 'import']);

});

Route::get('/direction/all', [DirectionController::class, 'index']);
Route::get('/profil/all', [ProfilController::class, 'index']);
Route::get('/service/all', [ServiceController::class, 'index']);
Route::get('/contry/all', [ContryController::class, 'index']);
