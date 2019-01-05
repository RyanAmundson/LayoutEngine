import { Injectable, ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { LayoutComponent } from '../layout.component';


@Injectable()
export class LayoutManagerService {
    _root:LayoutComponent;
    layouts: LayoutComponent[] = [];
    get root(): LayoutComponent { return this._root};
    set root(root:LayoutComponent) { this._root = root};

    constructor(){

    }

    register(instance:LayoutComponent){
        if(!this.root){
            this.root = instance;
        }
        this.layouts.push(instance);
    }

    deregister(instance:LayoutComponent){
        this.layouts.splice(this.layouts.indexOf(instance),1);
    }


}