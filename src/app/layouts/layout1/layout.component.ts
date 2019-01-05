import { Component, ViewChild, ElementRef, TemplateRef, ViewContainerRef, Input, Output,
  HostListener, ContentChild, ContentChildren, ComponentRef, ViewRef, EventEmitter, Inject } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    Event as RouterEvent,
    NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized,
    PRIMARY_OUTLET
} from '@angular/router';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    group
} from '@angular/animations';
import { filter } from 'rxjs/operators';
import { LayoutManagerService } from './services/layout-manager.service';
// import { Core, Custom } from '../../../assets/AngularAnimations';


@Component({
    selector: 'esq-layout',
    templateUrl: 'layout.component.html',
    styleUrls: [
        'layout.component.scss'
    ],
    animations: [
    ]
})
export class LayoutComponent {
    @Input() isMobile: false;

    @Output() ready: EventEmitter<void> = new EventEmitter<void>();

    //use these for container references
    @ViewChild('nbContainer', { read: ViewContainerRef }) nbContainer: ViewContainerRef;
    @ViewChild('lsmContainer', { read: ViewContainerRef }) lsmContainer: ViewContainerRef;
    @ViewChild('lsmfContainer', { read: ViewContainerRef }) lsmfContainer: ViewContainerRef;
    @ViewChild('mcContainer', { read: ViewContainerRef }) mcContainer: ViewContainerRef;
    @ViewChild('rsmContainer', { read: ViewContainerRef }) rsmContainer: ViewContainerRef;
    @ViewChild('qnContainer', { read: ViewContainerRef }) qnContainer: ViewContainerRef;
    @ViewChild('lomContainer', { read: ViewContainerRef }) lomContainer: ViewContainerRef;
    @ViewChild('romContainer', { read: ViewContainerRef }) romContainer: ViewContainerRef;
    @ViewChild('rsmfContainer', { read: ViewContainerRef }) rsmfContainer: ViewContainerRef;
    @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer: ViewContainerRef;
    @ViewChild('overlayContainer', { read: ViewContainerRef }) overlayContainer: ViewContainerRef;
    @ViewChild('alertsContainer', { read: ViewContainerRef }) alertsContainer: ViewContainerRef;
    @ViewChild('layoutContainer', { read: ViewContainerRef }) layoutContainer: ViewContainerRef;

    @ContentChild(TemplateRef) tR;
    @ContentChild("nb") navbar: TemplateRef<Element>;
    @ContentChild("lsm") leftSideMenu: TemplateRef<Element>;
    @ContentChild("lsmf") leftSideMenuFull: TemplateRef<Element>;
    @ContentChild("mc") mainContent: TemplateRef<Element>;
    @ContentChild("rsm") rightSideMenu: TemplateRef<Element>;
    @ContentChild("qn") quickNav: TemplateRef<Element>;
    @ContentChild("lom") leftOverlayMenu: TemplateRef<Element>;
    @ContentChild("rom") rightOverlayMenu: TemplateRef<Element>;
    @ContentChild("rsmf") rightSideMenuFull: TemplateRef<Element>;
    @ContentChild("modal") modal: TemplateRef<Element>;
    @ContentChild("overlay") overlay: TemplateRef<Element>;



    screen: { h: number, w: number } = { h: window.innerHeight, w: window.innerWidth };
    state: string[] = ['nb', 'qn', 'lsm', 'lsmf', 'rsm', 'alerts', 'rsmf'];   //['lsmf', 'lom', 'rom', 'rsm', 'lsm', 'nb', 'qn','modal','overlay']
    get mobile() { return this.screen.w < 812; }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.screen.w = window.innerWidth;
    }

    constructor(private layoutManager: LayoutManagerService) {
    }

    ngOnInit() {
        this.layoutManager.register(this);
    }

    ngOnDestroy() {
        this.layoutManager.deregister(this);
    }

    ngAfterContentInit() {
        this.ready.emit()
    }

    ngAfterViewInit() {

    }

    toggleMenu(name: string, state?: boolean) {
        if (state != null) {
            (state) ? this.addMenu(name) : this.removeMenu(name);
        } else {
            this.state.indexOf(name) !== -1 ? this.removeMenu(name) : this.addMenu(name);
        }
    }

    addMenu(name: string) {
        this.state.push(name);
    }

    removeMenu(name: string) {
        let index = this.state.indexOf(name);
        this.state.splice(index, 1);
    }


    private outsideClick(menu: string, event?) {
        this.removeMenu(menu);
        event.stopPropagation();
    }

    private insideClick(menu: string, event?) {
        event.stopPropagation();
    }
}
