<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class UserRoleModel extends Pivot
{
    use HasUuids;

    protected $table = 'user_roles';

    public $incrementing = false;

    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = ['id_user', 'id_role'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(UserRoleModel::class, 'id_user');
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(RoleModel::class, 'id_role');
    }
}
