<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BehaviorLogsModel extends Model
{
    use HasUuids;

    protected $table = "behavior_logs";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'id_user',
        'error_rate',
        'feature_usage',
        'idle_time',
        'task_time',
        'device_screen',
        'latency_rate'
    ];

    public function user():HasOne{
        return $this->hasOne(UserModel::class, 'id_user');
    }

}
