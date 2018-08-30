<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $levels = array(
            array('name' => 'roi'),
            array('name' => 'valet'),
            array('name' => 'nain')
        );
        foreach ($levels as $level) {
            DB::table('levels')->insert($level);
        }
        $nains = array(
            array('name' => 'gandaldf', 'email' => 'lalala@gmail.com', 'password' => 'qksdjqlsdkjqlsjd', 'telephone' => '0678971941', 'level_id' => 1),
            array('name' => 'toto', 'email' => 'toto@gmail.com', 'password' => 'qksdjqlsdkjqlsjd', 'telephone' => '0620142847', 'level_id' => 2),
            array('name' => 'shaki', 'email' => 'shaki@gmail.com', 'password' => 'qksdjqlsdkjqlsjd', 'telephone' => '0685726658', 'level_id' => 3),
            array('name' => 'politics', 'email' => 'po@gmail.com', 'password' => 'qksdjqlsdkjqlsjd', 'telephone' => '0633224869', 'level_id' => 3),
            array('name' => 'wowo', 'email' => 'wowo@gmail.com', 'password' => 'qksdjqlsdkjqlsjd', 'telephone' => '', 'level_id' => 3)
        );
        foreach ($nains as $nain) {
            DB::table('nains')->insert($nain);
        }
    }
}
