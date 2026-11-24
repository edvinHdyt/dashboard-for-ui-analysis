<?php

namespace App\Http\Controllers;

use App\Models\BehaviorLogsModel;
use Illuminate\Http\Request;

class BehaviorLogsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'id_user' => 'required|string',
            'task_time' => 'required',
            'idle_time' => 'required',
            'error_count' => 'required',
            'attempt_count' => 'required',
            'feature_usage' => 'required',
            'device_width' => 'required',
        ]);

        $errorRate = $request->error_count;

        if ($request->attempt_count > 0){
            $errorRate = $request->error_count / $request->attempt_count;
        }

        $latencyRate = $request->latency_rate == null ? 0 : $request->latency_rate/1000;

        BehaviorLogsModel::updateOrCreate([
            'id_user' => $request->id_user
        ],[
            'id_user' => $request->id_user,
            'task_time' => $request->task_time,
            'idle_time' => $request->idle_time,
            'feature_usage' => $request->feature_usage,
            'error_rate' => $errorRate,
            'latency_rate' => $latencyRate,
            'device_screen' => $request->device_width
        ]);

        return response()->json([
            "ok"
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
