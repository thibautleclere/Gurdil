<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNainsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nains', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 100);
            $table->string('email', 500);
            $table->string('password', 200);
            $table->string('telephone', 20);
            $table->string('avatar', 500);
            $table->integer('level_id')->nullable()->unsigned();
            $table->foreign('level_id')->references('id')->on('levels');
            $table->integer('score_id')->nullable()->unsigned();
            $table->foreign('score_id')->references('id')->on('scores');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('nains');
    }
}
