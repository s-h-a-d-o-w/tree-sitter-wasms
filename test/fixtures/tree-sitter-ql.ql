/**
 * @name Greet functions
 * @description Finds functions named greet.
 * @kind problem
 * @id demo/greet-functions
 */

import javascript

from Function f
where f.getName() = "greet"
select f, "Found a greet function."
