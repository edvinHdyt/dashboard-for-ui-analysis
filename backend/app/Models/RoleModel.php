<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Database\Factories\RoleFactory;

class RoleModel extends Model
{
    /** @use HasFactory<RoleFactory> */
    use HasFactory, HasUuids;

    public $timestamps = false;
    protected $table = 'roles';

    protected $fillable = ['role'];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(UserModel::class, 'user_roles', 'id_role', 'id_user')
            ->using(UserRoleModel::class)
            ->withPivot('id');
    }
}
