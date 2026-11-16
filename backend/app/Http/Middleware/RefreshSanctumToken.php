<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RefreshSanctumToken
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $token = $request->user()?->currentAccessToken();

        // Perpanjang expires_at setiap kali user aktif melakukan request yang valid
        if ($token && $token->expires_at) {
            $token->forceFill([
                'expires_at' => now()->addMinutes(120),
            ])->save();
        }

        return $response;
    }
}
