var routes: Route[] = [];
class Route {
    scope: string;
    handler: () => void;
    constructor(scope: string, handler: () => void) {
        this.scope = scope;
        this.handler = handler;
    }
}

export function connect(scope: string, handler: () => void): void {
    routes.push(new Route(scope, handler));
}

export function dispatch(scope: string): void {
    routes.forEach((r: Route) => {
        if (r.scope == scope) r.handler();
    });
}
