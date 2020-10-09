var handle: number = 0;
var GL: WebGL2RenderingContext;

function handler(game: WebGame) {
    function update() {
        handle = window.requestAnimationFrame(update);
    }

    if (handle === 0) {
        update();
    }
}

export enum State {

    MENU, CARS, STAGES, GAME

}

export class WebGame {

    private _state: State = State.MENU;

    public start(): void {
        handler(this);
    }

    public stop(): void {
        window.cancelAnimationFrame(handle);
    }

    public get state(): State {
        return this._state;
    }

    public set state(state: State) {
        this._state = state;
    }

    public set context(context: WebGL2RenderingContext) {
        GL = context;
    }

}

export default new WebGame();