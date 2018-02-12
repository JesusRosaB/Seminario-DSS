export enum StateType {
 //ESTADOS POSIBLES
 //Es el panel izquierdo visible?
 //Estamos en el panel principal o en el detail?
 Estado1,    //Menu abierto pantalla principal
 Estado2,    //Menu abierto pantalla detalles
 Estado3,    //Menu cerrado pantalla principal
 Estado4     //Menu cerrado pantalla detalles
}

export enum PanelType {
    Primary,
    Detail
}

export interface IState {
    getPanelType() : PanelType;
    getStateType() : StateType;
    isSideNavVisible() : boolean;
    getPanelButtonClass() : string;
}


export class Estado1 //extends State
    implements IState {
    getPanelType() : PanelType { return PanelType.Primary; }
    getStateType() : StateType { return StateType.Estado1; }
    getPanelButtonClass() : string { return 'fa-chevron-right';} //Devuelve una clase para >
    isSideNavVisible() : boolean { return true; }
}

export class Estado2 //extends State
    implements IState {
    getPanelType() : PanelType { return PanelType.Detail; }
    getStateType() : StateType { return StateType.Estado2; }
    getPanelButtonClass() : string { return 'fa-chevron-right';} //Devuelve una clase para >
    isSideNavVisible() : boolean { return true; }
}

export class Estado3 //extends State
    implements IState {
    getPanelType() : PanelType { return PanelType.Primary; }
    getStateType() : StateType { return StateType.Estado3; }
    getPanelButtonClass() : string { return 'fa-chevron-right';} //Devuelve una clase para >
    isSideNavVisible() : boolean { return false; }
}

export class Estado4 //extends State
    implements IState {
    getPanelType() : PanelType { return PanelType.Detail; }
    getStateType() : StateType { return StateType.Estado4; }
    getPanelButtonClass() : string { return 'fa-chevron-right';} //Devuelve una clase para >
    isSideNavVisible() : boolean { return false; }
}

export interface IMediatorImpl {
    showNavPanel();
    hideNavPanel();
    showDetailPanel();
    hideDetailPanel();
    changeShowHideSideButton(fromClass: string, toClass: string);
}

export class Mediator { //Permite trabajar con los estados
    private _estado1 = new Estado1();
    //RESTO DE ESTADOS POSIBLES...
    private _estado2 = new Estado2();
    private _estado3 = new Estado3();
    private _estado4 = new Estado4();

    private _currentState: IState;
    private _currentMainPanelState: IState;
    private _mediatorImpl: IMediatorImpl;

    //Se le inyecta una implementación concreta, independientemente de la UI
    constructor(mediatorImpl: IMediatorImpl) {
        this._mediatorImpl = mediatorImpl;
        this._currentState = this._currentMainPanelState = this._estado1;
    }

    getStateImpl(stateType: StateType) : IState {
        var stateImpl : IState;
        switch(stateType) {
            //DEVOLVER ESTADO DE ACUERDO AL ENUM 
            case StateType.Estado1:
                stateImpl = this._estado1;
                break;
            //...RESTO
            case StateType.Estado2:
                stateImpl = this._estado2;
                break;
            case StateType.Estado3:
                stateImpl = this._estado3;
                break;
            case StateType.Estado4:
                stateImpl = this._estado4;
                break;
        }
        return stateImpl;
    }


    moveToState(stateType: StateType) {
        var previousState = this._currentState;
        var nextState = this.getStateImpl(stateType);

        //LOGICA PARA MOVERSE ENTRE ESTADOS
    }

    //Abrir y cerrar el sideNav
    showHideSideNavClicked() {
        switch (this._currentState.getStateType()) {
            case StateType.Estado1:
                this.moveToState(StateType.Estado4);
                break;
            case StateType.Estado2:
                this.moveToState(StateType.Estado1);
                break;
            case StateType.Estado3:
                this.moveToState(StateType.Estado4);
                break;
            case StateType.Estado4:
                this.moveToState(StateType.Estado3);
                break;
        }
    }

    getCurrentMainPanelState() : StateType {
        return this._currentMainPanelState.getStateType();
    }

}