<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var string[]
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var string[]
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    // public function render($request, Throwable $exception)
    // {
    //     if( $request->is('api/*')){
    //         if ($exception instanceof ModelNotFoundException) {
    //             $model = strtolower(class_basename($exception->getModel()));
                    
    //             return response()->json(['error' => 'Model not found'], 404);
    //         }
    //         if ($exception instanceof NotFoundHttpException) {
    //             return response()->json(['error' => 'Resource not found'], 404);

    //         }
    //     }
    // }
}
