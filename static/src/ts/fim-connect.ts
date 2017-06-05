import * as Router from "./common/router";
import * as Index from "./view/index";
import * as Random from "./view/random";

Router.connect('Index', Index.init);
Router.connect('Random', Random.init);

function dispatch() {
    const html: Element = document.documentElement;
    const scope: string = html.getAttribute('data-page-scope');
    Router.dispatch(scope);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', dispatch);
} else {
    dispatch();
}
