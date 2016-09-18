# redis-live-react
React based library for Redis-Live, a fast & simple dashboard for Redis

This module is in **early development**. Feel free to follow along but not recommended to take a dependency on yet as the API surface area will be evolving for a while.

## Current features
* Redis command line to run ad hoc commands
* System status which summarizes key redis health metrics across all specified servers
* Charts
    * Spark lines to show trending health metrics (when combined with the repo [redis-stats](https://www.npmjs.com/package/redis-stats))
    * System charts to show detailed historical health metrics over hourly and daily time periods (when combined with the repo [redis-stats](https://www.npmjs.com/package/redis-stats))
* Cluster health view 
* Detailed server status

## Usage
Check out the Redis-Live server for an example implementation of this library:

[Redis Live Server](https://github.com/lawrips/redis-live)

More documentation to follow soon

## Min requirements
Tested against Redis 3.0+

## Todos
* Cleaner interfaces
* More customization options for modules
* Simplified / customizable layout grid
* Tests

More info coming soon.