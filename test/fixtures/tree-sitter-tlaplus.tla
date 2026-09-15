---- MODULE Demo ----
EXTENDS Naturals

VARIABLE counter

Init == counter = 0

Next == counter' = counter + 1

Spec == Init /\ [][Next]_counter

====
