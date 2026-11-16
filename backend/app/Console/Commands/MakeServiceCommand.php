<?php

namespace App\Console\Commands;

use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

#[Signature('make:service {name : Nama class service (contoh: AuthService)}')]
#[Description('Membuat file service baru di folder app/Services')]
class MakeServiceCommand extends Command
{
    public function handle(): int
    {
        $name = str_replace('\\', '/', $this->argument('name'));
        $path = app_path("Services/{$name}.php");

        if (File::exists($path)) {
            $this->error("Service {$name} sudah ada!");
            return self::FAILURE;
        }

        File::ensureDirectoryExists(dirname($path));

        $className = class_basename($name);
        $subNamespace = dirname($name) !== '.' ? '\\' . str_replace('/', '\\', dirname($name)) : '';

        $stub = <<<PHP
        <?php

        namespace App\Services{$subNamespace};

        class {$className}
        {
            public function __construct()
            {
                //
            }
        }
        PHP;

        File::put($path, $stub . "\n");
        $this->info("Service [app/Services/{$name}.php] berhasil dibuat.");

        return self::SUCCESS;
    }
}