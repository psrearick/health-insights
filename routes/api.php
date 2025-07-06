<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get("/health", function () {
    $data = [
        "labs" => [
            "glucose" => 90,
            "cholesterol" => 180,
            "blood_pressure" => "120/80",
            "vitamin_d" => 30,
            "bmi" => 22.5,
        ]
    ];
    return response()->json($data);
});
