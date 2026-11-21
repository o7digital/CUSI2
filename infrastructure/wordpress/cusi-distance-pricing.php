<?php
/** Calculate 400 MXN + excess one-way road kilometers × MXN/km, rounded to the cent. */
function cusi_distance_price_minor(int $meters, int $rate_minor, int $included_meters = 0): int {
    if ($meters < 0 || $included_meters < 0 || $rate_minor <= 0 || $meters > intdiv(PHP_INT_MAX - 500, $rate_minor)) {
        throw new InvalidArgumentException('Invalid delivery distance or kilometer rate.');
    }
    return 40000 + intdiv(max(0, $meters - $included_meters) * $rate_minor + 500, 1000);
}
