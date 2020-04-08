export interface HomeWidget {
    widgetNumber:number;
    onChange();
    onResize();
    toSave();
    load();
    delete();
}
