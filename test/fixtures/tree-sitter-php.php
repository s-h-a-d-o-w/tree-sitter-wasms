<?php

declare(strict_types=1);

namespace Demo;

final class Greeter
{
    public function __construct(private readonly string $name)
    {
    }

    public function greet(): string
    {
        return "Hello, {$this->name}!";
    }
}

foreach (['world', 'php'] as $name) {
    echo (new Greeter($name))->greet(), PHP_EOL;
}
