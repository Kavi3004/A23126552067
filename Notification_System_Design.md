# Stage 1

## Approach

Notifications are prioritized using a weight system:
- Placement = 3 (highest priority)
- Result = 2
- Event = 1 (lowest priority)

Notifications with the same type are sorted by recency (newer first).
The top N are sliced from the sorted array.

## Efficiency for new notifications

When new notifications arrive, they are added to the array
and re-sorted. This ensures the top N is always current
without storing anything in a database.

## Tech Stack
- React (Vite)
- Vanilla CSS
- Logging Middleware (custom)